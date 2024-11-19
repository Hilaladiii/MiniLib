import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { STATUS } from '@prisma/client';

@Injectable()
export class BorrowService {
  constructor(private prismaService: PrismaService) {}

  async create(book_id: string, user_id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (user.isBlocked)
      throw new BadRequestException(
        'You are blocked from system, please contact admin in offline library',
      );
    const book = await this.prismaService.book.findUnique({
      where: { id: book_id },
    });

    if (!book) throw new NotFoundException('Book not found');
    if (book.quantity == 0) throw new NotFoundException('Book not available');

    const userBorrow = await this.prismaService.borrowing.findFirst({
      where: {
        AND: [
          {
            book_id,
          },
          {
            user_id,
          },
        ],
      },
    });

    if (userBorrow && userBorrow.status == 'BORROWED')
      throw new BadRequestException('You only have to borrow one book');

    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 3);

    const newQuantity = book.quantity - 1;

    return await this.prismaService.$transaction([
      this.prismaService.borrowing.create({
        data: {
          due_date: dueDate,
          borrow_date: borrowDate,
          status: STATUS.BORROWED,
          user: {
            connect: {
              id: user_id,
            },
          },
          book: {
            connect: {
              id: book.id,
            },
          },
        },
      }),
      this.prismaService.book.update({
        data: {
          quantity: newQuantity,
        },
        where: {
          id: book.id,
        },
      }),
    ]);
  }

  async find(type?: STATUS) {
    return await this.prismaService.borrowing.findMany({
      select: {
        borrow_date: true,
        due_date: true,
        return_date: true,
        status: true,
        user: {
          select: {
            username: true,
          },
        },
        book: {
          select: {
            title: true,
          },
        },
      },
      where: {
        status: {
          equals: type,
        },
      },
    });
  }

  async findById(id: string) {
    const borrow = await this.prismaService.borrowing.findUnique({
      where: {
        id,
      },
    });
    if (!borrow) throw new NotFoundException('Borrow with this id not exist');
    return borrow;
  }

  async findUser(id: string) {
    const borrow = await this.prismaService.borrowing.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        borrow_date: true,
        due_date: true,
        status: true,
        book: {
          select: {
            id: true,
            title: true,
            cover_image: true,
          },
        },
      },
    });

    return borrow;
  }

  async returnBook(id: string) {
    const borrow = await this.prismaService.borrowing.findUnique({
      where: { id },
      include: {
        book: true,
      },
    });
    if (!borrow) throw new NotFoundException('Borrow not found');
    if (borrow.status == 'RETURNED')
      throw new BadRequestException('Book already returned');

    const newQuantity = borrow.book.quantity + 1;
    const returnDate = new Date();
    return await this.prismaService.borrowing.update({
      where: {
        id,
      },
      data: {
        status: 'RETURNED',
        return_date: returnDate,
        book: {
          update: {
            quantity: newQuantity,
          },
        },
      },
    });
  }
}
