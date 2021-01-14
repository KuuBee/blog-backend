import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './date/date.service';
import { ResponseService } from './response/response.service';

@Module({
  providers: [LibService, DateService, ResponseService],
  exports: [LibService, DateService, ResponseService],
})
export class LibModule {}
