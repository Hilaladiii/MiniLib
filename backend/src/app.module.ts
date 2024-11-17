import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { BorrowModule } from './modules/borrow/borrow.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [AuthModule, UserModule, BookModule, BorrowModule, SupabaseModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
