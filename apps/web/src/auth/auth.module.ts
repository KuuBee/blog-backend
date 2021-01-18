import { Body, Module, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LibModule } from '@app/lib';
import { JwtModule } from '@nestjs/jwt';
import { LibJwtService } from '@app/lib/jwt/jwt.service';
// TODO 密钥需要隐藏
const secret = 'secretKey';
@Module({
  imports: [
    UserModule,
    LibModule,
    JwtModule.register({
      secret,
      signOptions: {
        expiresIn: '60 days',
      },
    }),
  ],
  providers: [AuthService, LibJwtService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
