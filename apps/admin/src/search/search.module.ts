import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [SearchController],
})
export class SearchModule {}
