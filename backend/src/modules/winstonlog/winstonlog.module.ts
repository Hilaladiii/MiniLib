import { Module } from '@nestjs/common';
import { WinstonlogService } from './winstonlog.service';

@Module({
  providers: [WinstonlogService],
  exports: [WinstonlogService],
})
export class WinstonlogModule {}
