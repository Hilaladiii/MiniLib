import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Message } from 'src/common/decorators/message.decorator';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { TokenGuard } from 'src/common/guards/token.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Message('Success login into your account')
  async login(@Body() authDto: AuthDto) {
    return await this.authService.login(authDto);
  }

  @Post('logout')
  @UseGuards(TokenGuard)
  @Message('Success logout into your account')
  async logout(@GetCurrentUserId() id: string) {
    return await this.authService.logout(id);
  }
}
