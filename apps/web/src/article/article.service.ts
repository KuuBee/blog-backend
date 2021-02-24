import { IndexArticleDTO } from '@app/lib/dto/article/index.dto';
import { ArticleEntity, ArticleStatus } from '@app/lib/entity/article.entity';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private _articleRepository: Repository<ArticleEntity>,
    private _responseService: ResponseService,
    private _paginationService: PaginationService,
  ) {}
  async index({
    page,
    pageSize = 5,
    tagId,
    classificationId,
  }: IndexArticleDTO) {
    const qb = this._articleRepository
      .createQueryBuilder('article')
      .select([
        'article.articleId',
        'article.title',
        'classification.classificationId',
        'classification.content',
        'article.tagId',
        'article.firstParagraph',
        'article.createdAt',
        'article.updatedAt',
      ])
      .innerJoin('article.classification', 'classification')
      .where('article.status = :status', {
        status: ArticleStatus.ENABLE,
      });
    if (classificationId) {
      qb.andWhere('article.classificationId = :classificationId', {
        classificationId,
      });
    }
    if (tagId) {
      qb.andWhere(':tagId = ANY(article.tagId)', {
        tagId,
      });
    }
    const data = await this._paginationService.pagination({
      queryBuilder: qb.orderBy('article.createdAt', 'DESC'),
      page,
      pageSize,
    });
    return this._responseService.success({
      data,
    });
  }

  async info(id: number) {
    const data = await this._articleRepository
      .createQueryBuilder('article')
      .select([
        'article.articleId',
        'article.title',
        'article.articleLink',
        'classification.classificationId',
        'classification.content',
        'article.tagId',
        'article.createdAt',
        'article.updatedAt',
      ])
      .innerJoin('article.classification', 'classification')
      .where(`article.articleId = :id`, {
        id,
      })
      .andWhere('article.status = :status', {
        status: ArticleStatus.ENABLE,
      })
      .getOne();
    return this._responseService.success({
      data,
    });
  }
}
