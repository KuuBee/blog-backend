import { ArticleEntity } from '@app/lib/entity/article.entity';
import { ClassificationEntity } from '@app/lib/entity/classification.entity';
import { TagEntity } from '@app/lib/entity/tag.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RpcService {
  constructor(
    @InjectRepository(ArticleEntity)
    private _article: Repository<ArticleEntity>,
    @InjectRepository(ArticleEntity)
    private _tag: Repository<TagEntity>,
    @InjectRepository(ArticleEntity)
    private _class: Repository<ClassificationEntity>,
    private _responseService: ResponseService,
  ) {}

  // 获取blog基础信息
  async getBlogInfo() {
    const [, tagCount] = await this._tag.findAndCount();
    const [, classCount] = await this._class.findAndCount();
    const [, articleCount] = await this._article.findAndCount();
    return this._responseService.success({
      data: {
        tagCount,
        classCount,
        articleCount,
      },
    });
  }
}
