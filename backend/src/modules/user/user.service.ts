import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'argon2';
import { argonOption } from 'src/common/config/argon';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async register(data: CreateUserDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user)
      throw new BadRequestException('User with this email already exists');

    const hashedPassword = await hash(data.password, argonOption);

    return await this.prismaService.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashedPassword,
      },

      select: {
        email: true,
        username: true,
      },
    });
  }

  async find() {
    return await this.prismaService.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
      },
    });
  }

  async findByid(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    if (!user) throw new NotFoundException('user not found');

    return user;
  }
}
