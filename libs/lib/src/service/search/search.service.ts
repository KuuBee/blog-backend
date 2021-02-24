/*
 * @Descripttion: 搜索api公用
 * @Author: KuuBee
 * @Date: 2021-02-20 11:26:17
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-20 11:34:30
 */
import { IndexSearchDTO, SearchType } from '@app/lib/dto/search/index.dto';
import { ArticleEntity, ArticleStatus } from '@app/lib/entity/article.entity';
import {
  ClassificationEntity,
  ClassificationStatus,
} from '@app/lib/entity/classification.entity';
import { TagEntity, TagStatus } from '@app/lib/entity/tag.entity';
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
    let status: string;
    switch (query.type) {
      case SearchType.ARTICLE:
        status = ArticleStatus.ENABLE;
        qb = this._articleEntityRepository
          .createQueryBuilder('article')
          .select('article.articleId', 'id')
          .addSelect('article.title', 'name');
        break;
      case SearchType.TAG:
        status = TagStatus.ENABLE;
        qb = this._tagRepository
          .createQueryBuilder('tag')
          .select('tag.tagId', 'id')
          .addSelect('tag.content', 'name');
        break;
      case SearchType.CLASSIFICATION:
        status = ClassificationStatus.ENABLE;
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
        .where(`${query.type}.status = :status`, {
          status,
        })
        .orderBy('id', 'ASC')
        .getRawMany<{ id: number; name: string }>(),
    });
  }
}
