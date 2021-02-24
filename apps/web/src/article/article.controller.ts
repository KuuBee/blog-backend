import { IndexArticleDTO } from '@app/lib/dto/article/index.dto';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private _articleService: ArticleService) {}
  @Get()
  index(@Query() query: IndexArticleDTO) {
    return this._articleService.index(query);
  }

  @Get(':id')
  info(@Param('id') id: string) {
    return this._articleService.info(parseInt(id));
  }
}
