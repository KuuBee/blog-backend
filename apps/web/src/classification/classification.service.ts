import {
  ClassificationEntity,
  ClassificationStatus,
} from '@app/lib/entity/classification.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClassificationService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(ClassificationEntity)
    private _repository: Repository<ClassificationEntity>,
  ) {}

  async index() {
    const data = await this._repository.find({
      select: ['classificationId', 'content', 'count'],
      where: [
        {
          status: ClassificationStatus.ENABLE,
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
}
