import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prismaService: PrismaService) {}

  async create(cover_uri: string, data: CreateBookDto) {
    const { title, description, author_name, publisher_name, year_published } =
      data;
    return await this.prismaService.book.create({
      data: {
        title,
        description,
        author_name,
        publisher_name,
        year_published,
        cover_image: cover_uri,
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

  async update(id: string, updateBookDto: updateBookDto) {
    const book = await this.prismaService.book.findUnique({ where: { id } });
    if (!book) throw new BadRequestException('Book not found');

    return await this.prismaService.book.update({
      where: {
        id,
      },
      data: updateBookDto,
    });
  }
}
