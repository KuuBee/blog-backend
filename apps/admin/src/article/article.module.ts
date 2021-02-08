import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ALL_ENTITY, LibModule } from '@app/lib';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
