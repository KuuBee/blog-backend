import { Body, Module, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { LibModule } from '@app/lib';

@Module({
  imports: [UserModule, LibModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
