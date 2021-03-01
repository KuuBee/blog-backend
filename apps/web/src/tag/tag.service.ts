import { TagEntity, TagStatus } from '@app/lib/entity/tag.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(TagEntity)
    private _tagRepository: Repository<TagEntity>,
  ) {}
  async index() {
    const data = await this._tagRepository.find({
      select: ['tagId', 'count', 'content'],
      where: [
        {
          status: TagStatus.ENABLE,
        },
      ],
      order: {
        createdAt: 'DESC',
      },
    });
    return this._response.success({
      data,
    });
  }

  async info(id: string) {
    const data = await this._tagRepository.findOne(id, {
      select: ['tagId', 'content', 'createdAt'],
    });
    return this._response.success({
      data,
    });
  }
}
