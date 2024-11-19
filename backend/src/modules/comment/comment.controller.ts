import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Message } from 'src/common/decorators/message.decorator';
import { TokenGuard } from 'src/common/guards/token.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(TokenGuard)
  @Message('Success create comment')
  async create(
    @GetCurrentUserId() user_id: string,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return await this.commentService.createComment(
      user_id,
      createCommentDto.book_id,
      createCommentDto.borrowing_id,
      createCommentDto.content,
    );
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  @Message('Success get comment by book id')
  async findByBookId(@Param('id') id: string) {
    return await this.commentService.findbyBookId(id);
  }
}
