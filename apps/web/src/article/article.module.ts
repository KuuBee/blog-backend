import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
