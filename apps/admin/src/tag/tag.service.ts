import { CreateTagDTO } from '@app/lib/dto/tag/create.dto';
import { IndexTagDTO } from '@app/lib/dto/tag/index.dto';
import { TagEntity } from '@app/lib/entity/tag.entity';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { ResponseService } from '@app/lib/service/response.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    private _responseService: ResponseService,
    @InjectRepository(TagEntity)
    private _tagRepository: Repository<TagEntity>,
    private _paginationService: PaginationService,
  ) {}

  async index(data: IndexTagDTO) {
    const res = await this._paginationService.pagination({
      queryBuilder: this._tagRepository
        .createQueryBuilder('tag')
        .select([
          'tag.tagId',
          'tag.content',
          'tag.count',
          'tag.createdAt',
          'tag.updatedAt',
          'tag.status',
        ])
        .orderBy({ 'tag.createdAt': 'DESC' }),
      page: data.page,
      pageSize: data.pageSize,
    });
    return this._responseService.success({
      data: res,
    });
  }

  async create(data: CreateTagDTO) {
    const findOne = await this._tagRepository.findOne({
      content: data.name,
    });
    if (findOne) {
      return this._responseService.error({
        message: '标签命名重复',
        code: HttpStatus.BAD_REQUEST,
      });
    }
    await this._tagRepository.insert({
      content: data.name,
      status: data.status,
      count: 0,
    });
    return this._responseService.success({
      message: '创建成功！',
    });
  }
}
