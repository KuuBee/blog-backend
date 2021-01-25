import { Body, Module, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LibModule } from '@app/lib';
import { JwtModule } from '@nestjs/jwt';
import { LibJwtService } from '@app/lib/service/jwt.service';
@Module({
  imports: [UserModule, LibModule],
  providers: [AuthService, LibJwtService],
  controllers: [AuthController],
})
export class AuthModule {}
