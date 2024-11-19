import { IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  book_id: string;

  @IsNotEmpty()
  @IsString()
  borrowing_id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
