import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
