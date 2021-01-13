import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './date/date.service';

@Module({
  providers: [LibService, DateService],
  exports: [LibService, DateService],
})
export class LibModule {}
