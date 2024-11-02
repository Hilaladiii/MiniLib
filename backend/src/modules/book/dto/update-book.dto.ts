import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  MaxLength,
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
  @IsPositive()
  year_published: number;
}
