import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { Message } from 'src/common/decorators/message.decorator';
import { TokenGuard } from 'src/common/guards/token.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  @Message('Success register your account')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.register(createUserDto);
  }

  @Get()
  @UseGuards(TokenGuard)
  @Message('Success get all users')
  async find() {
    return await this.userService.find();
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  @Message('Success get user by id')
  async findById(@Param('id') id: string) {
    return await this.userService.findByid(id);
  }

  @Put('block/:id')
  @Message('Success block user')
  @UseGuards(TokenGuard)
  async block(@Param('id') id: string) {
    return await this.userService.block(id);
  }

  @Put('unblock/:id')
  @Message('Success unblock user')
  @UseGuards(TokenGuard)
  async unBlock(@Param('id') id: string) {
    return await this.userService.unBlock(id);
  }
}
