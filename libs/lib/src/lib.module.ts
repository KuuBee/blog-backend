import path from 'path';
import { Module } from '@nestjs/common';
import { LibService } from './lib.service';
import { DateService } from './service/date.service';
import { ResponseService } from './service/response.service';
import { LibJwtService } from './service/jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UtilsService } from './service/utils.service';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from './service/crypto/crypto.service';
import { CryptInterceptor } from './interceptor/crypt.interceptor';
import { PaginationService } from './service/pagination/pagination.service';
import { EnvService } from './service/env/env.service';
import { SearchService } from './service/search/search.service';
import { ALL_ENTITY } from './utils/entity';
import { PushService } from './service/push/push.service';
import { EmailService } from './service/email/email.service';

// TODO jwt密钥需要隐藏
export const jwtSecretKey = 'secretKey2';

const MODULE = [
  ConfigModule.forRoot({
    envFilePath: path.normalize(__dirname + '../../../../.env'),
  }),
  // JwtModule.register({
  //   secret: jwtSecretKey,
  //   signOptions: {
  //     expiresIn: '60 days',
  //   },
  // }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (config: ConfigService) => ({
      secret: config.get('JWT_SECRET_KEY'),
    }),
    inject: [ConfigService],
  }),
  ...ALL_ENTITY,
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
  SearchService,
  PushService,
  EmailService,
];
@Module({
  imports: [...MODULE],
  providers: [...SERVICE],
  exports: [...SERVICE, ...MODULE],
})
export class LibModule {}
