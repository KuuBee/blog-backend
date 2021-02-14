import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
