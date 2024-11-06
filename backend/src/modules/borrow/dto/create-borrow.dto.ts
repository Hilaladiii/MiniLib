import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBorrowDto {
  @IsNotEmpty()
  @IsString()
  book_id: string;
}
