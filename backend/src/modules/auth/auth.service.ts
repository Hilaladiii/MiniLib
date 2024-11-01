import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { argonOption } from 'src/common/config/argon';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(data: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await verify(user.password, data.password);

    if (!isPasswordValid)
      throw new BadRequestException('Email or password invalid');

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: '1d',
      },
    );

    const hashedToken = await hash(token, argonOption);
    await this.prismaService.user.update({
      data: {
        token: hashedToken,
      },
      where: {
        email: user.email,
      },
    });

    return { token };
  }

  async logout(id: string) {
    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        token: null,
      },
    });
  }
}
