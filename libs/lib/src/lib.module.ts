import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './service/date.service';
import { ResponseService } from './service/response.service';
import { LibJwtService } from './service/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './service/utils.service';
import path from 'path';
import { JwtModule } from '@nestjs/jwt';

// TODO 密钥需要隐藏
const secret = 'secretKey';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.normalize(__dirname + '../../../../.env'),
    }),
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn: '60 days',
      },
    }),
  ],
  providers: [
    LibService,
    DateService,
    ResponseService,
    LibJwtService,
    UtilsService,
  ],
  exports: [
    LibService,
    DateService,
    ResponseService,
    LibJwtService,
    ConfigModule,
    UtilsService,
    JwtModule,
  ],
})
export class LibModule {}
