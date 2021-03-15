import { IndexReplyDTO } from '@app/lib/dto/reply/index.dto';
import { UpdatePartReplyDTO } from '@app/lib/dto/reply/update.dto';
import { ReplyEntity } from '@app/lib/entity/reply.entity';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ReplyService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(ReplyEntity)
    private _repository: Repository<ReplyEntity>,
    private _pagination: PaginationService,
  ) {}

  async index({ pageSize, page }: IndexReplyDTO.Admin) {
    const queryBuilder = this._repository
      .createQueryBuilder('reply')
      .select([
        'reply.id',
        'reply.os',
        'reply.browser',
        'reply.content',
        'reply.createdAt',
        'reply.status',
        'reply.commentId',
        'user.name',
        'user.userId',
      ])
      .innerJoin('reply.user', 'user')
      // .innerJoin('reply.comment', 'comment')
      .orderBy('reply.createdAt', 'DESC');
    const data = await this._pagination.pagination({
      queryBuilder,
      page,
      pageSize,
    });
    return this._response.success({
      data,
    });
  }
  async updatePart(body: UpdatePartReplyDTO) {
    await this._repository.save(body);
    return this._response.success({
      message: '更新成功！',
    });
  }
}
