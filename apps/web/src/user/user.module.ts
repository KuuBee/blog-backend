import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'shared/entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LibModule } from '@app/lib';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LibModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserModule {}
