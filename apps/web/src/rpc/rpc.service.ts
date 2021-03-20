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
    @InjectRepository(TagEntity)
    private _tag: Repository<TagEntity>,
    @InjectRepository(ClassificationEntity)
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
        tag: [
          {
            icon: 'article',
            tips: '文章',
            count: articleCount,
          },
          {
            icon: 'class',
            tips: '分类',
            count: classCount,
          },
          {
            icon: 'tag',
            tips: '标签',
            count: tagCount,
          },
        ],
      },
    });
  }
}
