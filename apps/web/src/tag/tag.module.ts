import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
