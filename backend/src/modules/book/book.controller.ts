import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TokenGuard } from 'src/common/guards/token.guard';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { Message } from 'src/common/decorators/message.decorator';
import { updateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('book')
export class BookController {
  constructor(
    private bookService: BookService,
    private supabaseService: SupabaseService,
  ) {}

  @Post('create')
  @Message('Success create book')
  @UseGuards(TokenGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBookDto: CreateBookDto,
  ) {
    const cover_uri = await this.supabaseService.upload(file);
    return await this.bookService.create(cover_uri.publicUrl, {
      title: createBookDto.title,
      author_name: createBookDto.author_name,
      description: createBookDto.description,
      publisher_name: createBookDto.publisher_name,
      year_published: createBookDto.year_published,
    });
  }

  @Get()
  @Message('Success get all books')
  @UseGuards(TokenGuard)
  async find() {
    return await this.bookService.find();
  }

  @Get(':id')
  @Message('Success get book by id')
  @UseGuards(TokenGuard)
  async findById(@Param('id') id: string) {
    return this.bookService.findById(id);
  }

  @Put('update/:id')
  @UseGuards(TokenGuard)
  @Message('Success update book')
  async update(@Param('id') id: string, updateBookDto: updateBookDto) {
    return await this.bookService.update(id, updateBookDto);
  }

  @Delete('delete/:id')
  @UseGuards(TokenGuard)
  @Message('Success delete book')
  async delete(@Param('id') id: string) {
    await this.bookService.delete(id);
  }
}
