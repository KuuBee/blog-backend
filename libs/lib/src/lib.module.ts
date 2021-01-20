import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './date/date.service';
import { ResponseService } from './response/response.service';
import { LibJwtService } from './jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.normalize(__dirname + '../../../../.env'),
    }),
  ],
  providers: [LibService, DateService, ResponseService, LibJwtService],
  exports: [
    LibService,
    DateService,
    ResponseService,
    LibJwtService,
    ConfigModule,
  ],
})
export class LibModule {}
