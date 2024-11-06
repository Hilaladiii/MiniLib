import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { TokenGuard } from 'src/common/guards/token.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/common/types/jwt.type';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { Message } from 'src/common/decorators/message.decorator';

@Controller('borrow')
export class BorrowController {
  constructor(private borrowService: BorrowService) {}

  @Post('create')
  @UseGuards(TokenGuard)
  @Message('Success create borrow')
  async create(
    @Body() createBorrowDto: CreateBorrowDto,
    @Req() request: Request,
  ) {
    const user = request.user as JwtPayload;
    await this.borrowService.create(createBorrowDto.book_id, user.sub);
  }

  @Post('update')
  @UseGuards(TokenGuard)
  @Message('Success update borrow')
  async update(@Body() updateBorrowDto: UpdateBorrowDto) {
    await this.borrowService.update(updateBorrowDto.id, updateBorrowDto.status);
  }
}
