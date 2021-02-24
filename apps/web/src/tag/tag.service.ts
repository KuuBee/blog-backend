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
    const res = await this._tagRepository.find({
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
      data: res,
    });
  }
}
