import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';

@Module({
  imports: [...ALL_ENTITY, LibModule],
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
