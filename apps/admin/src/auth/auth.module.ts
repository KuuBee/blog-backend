import { ALL_ENTITY, LibModule } from '@app/lib';
import { LibJwtService } from '@app/lib/service/jwt.service';
import { Module } from '@nestjs/common';
import { AuthController } from 'apps/web/src/auth/auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
