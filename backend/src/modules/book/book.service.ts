import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import { SupabaseService } from '../supabase/supabase.service';
import { UpdateBorrowDto } from '../borrow/dto/update-borrow.dto';

@Injectable()
export class BookService {
  constructor(
    private prismaService: PrismaService,
    private supabaseService: SupabaseService,
  ) {}

  async create(file: Express.Multer.File, data: CreateBookDto) {
    const cover_uri = await this.supabaseService.upload(file);
    const { title, author_name, publisher_name, year_published, quantity } =
      data;
    return await this.prismaService.book.create({
      data: {
        title,
        author_name,
        publisher_name,
        year_published,
        quantity,
        cover_image: cover_uri.publicUrl,
      },
    });
  }

  async find() {
    return await this.prismaService.book.findMany();
  }

  async findById(id: string) {
    const book = await this.prismaService.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async delete(id: string) {
    const book = await this.prismaService.book.findUnique({ where: { id } });
    if (!book) throw new BadRequestException('Book not found');

    return await this.prismaService.book.delete({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    file: Express.Multer.File,
    updateBookDto: updateBookDto,
  ) {
    const book = await this.prismaService.book.findUnique({ where: { id } });

    if (!book) throw new BadRequestException('Book not found');

    let cover_uri = book.cover_image;
    if (file) {
      await this.supabaseService.delete(book.cover_image);
      const { publicUrl } = await this.supabaseService.upload(file);
      cover_uri = publicUrl;
    }

    return await this.prismaService.book.update({
      where: {
        id,
      },
      data: {
        ...updateBookDto,
        cover_image: cover_uri,
      },
    });
  }
}
