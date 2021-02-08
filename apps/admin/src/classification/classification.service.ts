import { CreateClassificationDTO } from '@app/lib/dto/classification/create.dto';
import { IndexClassificationDTO } from '@app/lib/dto/classification/index.dto';
import { ClassificationEntity } from '@app/lib/entity/classification.entity';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { ResponseService } from '@app/lib/service/response.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassificationService {
  constructor(
    private _responseService: ResponseService,
    @InjectRepository(ClassificationEntity)
    private _classificationRepository: Repository<ClassificationEntity>,
    private _paginationService: PaginationService,
  ) {}
  async index(data: IndexClassificationDTO) {
    const res = await this._paginationService.pagination({
      queryBuilder: this._classificationRepository
        .createQueryBuilder('classification')
        .select([
          'classification.classificationId',
          'classification.content',
          'classification.status',
          'classification.count',
          'classification.createdAt',
          'classification.updatedAt',
        ])
        .orderBy({ 'classification.createdAt': 'DESC' }),
      pageSize: data.pageSize,
      page: data.page,
    });
    return this._responseService.success({
      data: res,
    });
  }
  async create(body: CreateClassificationDTO) {
    const findOne = await this._classificationRepository.findOne({
      content: body.name,
    });
    if (findOne)
      return this._responseService.error({
        code: HttpStatus.I_AM_A_TEAPOT,
        message: '分类命名重复',
      });
    await this._classificationRepository.insert({
      content: body.name,
      status: body.status,
    });
    return this._responseService.success({
      message: '创建成功！',
    });
  }
}
