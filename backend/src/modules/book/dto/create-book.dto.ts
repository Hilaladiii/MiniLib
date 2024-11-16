import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  author_name: string;

  @IsNotEmpty()
  publisher_name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  year_published: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  quantity: number;
}
