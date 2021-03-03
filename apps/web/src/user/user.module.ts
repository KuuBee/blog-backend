import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@app/lib/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ALL_ENTITY, LibModule } from '@app/lib';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
