import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async createComment(
    user_id: string,
    book_id: string,
    borrowing_id: string,
    content: string,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) throw new NotFoundException('user not found');

    const book = await this.prismaService.book.findUnique({
      where: {
        id: book_id,
      },
    });

    if (!book) throw new NotFoundException('book not found');

    const borrowing = await this.prismaService.borrowing.findUnique({
      where: {
        id: borrowing_id,
      },
    });

    if (!borrowing) throw new NotFoundException('borrowing record not found');

    const commentExist = await this.prismaService.comment.findFirst({
      where: {
        book_id: book.id,
        borrowing_id: borrowing_id,
        user_id: user_id,
      },
    });

    if (commentExist)
      throw new BadRequestException(
        'You are only allowed to comment once on this book for the specified borrowing.',
      );

    return await this.prismaService.comment.create({
      data: {
        content,
        book: {
          connect: {
            id: book_id,
          },
        },
        user: {
          connect: {
            id: user_id,
          },
        },
        borrowing: {
          connect: {
            id: borrowing_id,
          },
        },
      },
    });
  }

  async findbyBookId(id: string) {
    const book = await this.prismaService.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) throw new NotFoundException('book not found');

    return await this.prismaService.comment.findMany({
      where: {
        book_id: book.id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });
  }
}
