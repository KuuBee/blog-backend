import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ALL_ENTITY, LibModule } from '@app/lib';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
