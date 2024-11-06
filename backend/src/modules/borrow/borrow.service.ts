import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { STATUS } from '@prisma/client';

@Injectable()
export class BorrowService {
  constructor(private prismaService: PrismaService) {}

  async create(book_id: string, user_id: string) {
    const book = await this.prismaService.book.findUnique({
      where: { id: book_id },
    });
    if (!book) throw new NotFoundException('Book not found');
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 3);

    return await this.prismaService.borrowing.create({
      data: {
        due_date: dueDate,
        borrow_date: borrowDate,
        user: {
          connect: {
            id: user_id,
          },
        },
        book: {
          connect: {
            id: book_id,
          },
        },
      },
    });
  }

  async update(id: string, status: STATUS) {
    const borrow = await this.prismaService.borrowing.findUnique({
      where: { id },
    });
    if (!borrow) throw new NotFoundException('Borrow not found');

    return await this.prismaService.borrowing.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}
