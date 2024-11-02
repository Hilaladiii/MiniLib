import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  providers: [BookService, SupabaseService],
  controllers: [BookController],
})
export class BookModule {}
