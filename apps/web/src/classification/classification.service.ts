import {
  ClassificationEntity,
  ClassificationStatus,
} from '@app/lib/entity/classification.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ClassificationService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(ClassificationEntity)
    private _repository: Repository<ClassificationEntity>,
  ) {}

  private _findClassAdditionalInfo: Pick<
    FindOneOptions<ClassificationEntity>,
    'where' | 'order'
  > = {
    where: [
      {
        status: ClassificationStatus.ENABLE,
      },
    ],
    order: {
      createdAt: 'DESC',
    },
  };

  async index() {
    const data = await this._repository.find({
      select: ['classificationId', 'content', 'count'],
      ...this._findClassAdditionalInfo,
    });
    return this._response.success({
      data,
    });
  }

  async info(id: string) {
    const data = await this._repository.findOne(id, {
      select: ['classificationId', 'content', 'createdAt'],
      ...this._findClassAdditionalInfo,
    });
    return this._response.success({
      data,
    });
  }
}
