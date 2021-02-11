import path from 'path';
import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './service/date.service';
import { ResponseService } from './service/response.service';
import { LibJwtService } from './service/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { UtilsService } from './service/utils.service';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './service/crypto/crypto.service';
import { CryptInterceptor } from './interceptor/crypt.interceptor';
import { PaginationService } from './service/pagination/pagination.service';
import { EnvService } from './service/env/env.service';

// TODO jwt密钥需要隐藏
const secret = 'secretKey';

const MODULE = [
  ConfigModule.forRoot({
    envFilePath: path.normalize(__dirname + '../../../../.env'),
  }),
  JwtModule.register({
    secret,
    signOptions: {
      expiresIn: '60 days',
    },
  }),
];
const SERVICE = [
  LibService,
  DateService,
  ResponseService,
  LibJwtService,
  UtilsService,
  CryptoService,
  CryptInterceptor,
  PaginationService,
  EnvService,
];
@Module({
  imports: [...MODULE],
  providers: [...SERVICE],
  exports: [...SERVICE, ...MODULE],
})
export class LibModule {}
