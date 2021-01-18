import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './date/date.service';
import { ResponseService } from './response/response.service';
import { LibJwtService } from './jwt/jwt.service';

@Module({
  providers: [LibService, DateService, ResponseService, LibJwtService],
  exports: [LibService, DateService, ResponseService, LibJwtService],
})
export class LibModule {}
