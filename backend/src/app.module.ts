import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './modules/book/book.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { BorrowModule } from './modules/borrow/borrow.module';
import { WinstonlogModule } from './modules/winstonlog/winstonlog.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UserModule,
    AuthModule,
    BookModule,
    SupabaseModule,
    BorrowModule,
    WinstonlogModule,
    CommentModule,
  ],
})
export class AppModule {}
