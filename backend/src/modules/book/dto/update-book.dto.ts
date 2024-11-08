import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class updateBookDto {
  @IsOptional()
  @MaxLength(255)
  title: string;

  @IsOptional()
  @MinLength(100)
  description: string;

  @IsOptional()
  cover_image: string;

  @IsOptional()
  author_name: string;

  @IsOptional()
  publisher_name: string;

  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1000)
  year_published: number;
}
