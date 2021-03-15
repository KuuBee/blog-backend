import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
