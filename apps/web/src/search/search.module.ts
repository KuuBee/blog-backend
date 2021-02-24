import { LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';

@Module({
  imports: [LibModule],
  controllers: [SearchController],
})
export class SearchModule {}
