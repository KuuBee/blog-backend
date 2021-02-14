import { IndexSearchDTO, SearchType } from '@app/lib/dto/search/index.dto';
import { ArticleEntity } from '@app/lib/entity/article.entity';
import { ClassificationEntity } from '@app/lib/entity/classification.entity';
import { TagEntity } from '@app/lib/entity/tag.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    private _responseService: ResponseService,
    @InjectRepository(ClassificationEntity)
    private _classificationRepository: Repository<ClassificationEntity>,
    @InjectRepository(TagEntity)
    private _tagRepository: Repository<TagEntity>,
    @InjectRepository(ArticleEntity)
    private _articleEntityRepository: Repository<ArticleEntity>,
  ) {}
  async index(query: IndexSearchDTO) {
    let qb: SelectQueryBuilder<any>;
    switch (query.type) {
      case SearchType.ARTICLE:
        qb = this._articleEntityRepository
          .createQueryBuilder('article')
          .select('article.articleId', 'id')
          .addSelect('article.title', 'name');
        break;
      case SearchType.TAG:
        qb = this._tagRepository
          .createQueryBuilder('tag')
          .select('tag.tagId', 'id')
          .addSelect('tag.content', 'name');
        break;
      case SearchType.CLASSIFICATION:
        qb = this._classificationRepository
          .createQueryBuilder('classification')
          .select('classification.classificationId', 'id')
          .addSelect('classification.content', 'name');
        break;
      default:
        return this._responseService.error({
          message: '未知type！请检查type类型',
        });
    }
    return this._responseService.success({
      data: await qb
        .orderBy('id', 'ASC')
        .getRawMany<{ id: number; name: string }>(),
    });
  }
}
