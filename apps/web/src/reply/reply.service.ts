import { CreateReplyDTO } from '@app/lib/dto/reply/create.dto';
import {
  FriendLinkEntity,
  FriendLinkStatus,
} from '@app/lib/entity/friend-link.entity';
import {
  ReplyEntity,
  ReplyStatus,
  ReplyType,
} from '@app/lib/entity/reply.entity';
import { UserEntity } from '@app/lib/entity/user.entity';
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
  ) {}

  async create(body: CreateReplyDTO, userId: number) {
    console.log(body, userId);

    const { replyType, replyId } = body;
    if (replyType === ReplyType.REPLY && !replyId) {
      return this._response.error({
        message: '缺少replyId',
      });
    }
    await this._repository.save({
      ...body,
      userId,
      status: ReplyStatus.ENABLE,
    });
    return this._response.success({
      message: '回复成功！',
    });
  }

  async index(articleId: number, commentId: number) {
    const qb = this._repository
      .createQueryBuilder('reply')
      .select([
        'reply.id "replyId"',
        'reply.commentId "commentId"',
        'reply.content "content"',
        'reply.os os',
        'reply.browser browser',
        'reply.createdAt "createdAt"',
        'user.name "name"',
        'user.avatar avatar',
        'user.level "level"',
      ])
      .addSelect((subQuery) => {
        return subQuery
          .select('friendLink.link')
          .from(FriendLinkEntity, 'friendLink')
          .where('friendLink.userId = user.userId')
          .andWhere('friendLink.status = :status', {
            status: FriendLinkStatus.ENABLE,
          });
      }, 'link')
      .innerJoin('reply.user', 'user')
      .where('reply.status = :status', {
        status: ReplyStatus.ENABLE,
      });
    if (!Number.isNaN(articleId))
      qb.andWhere('reply.articleId = :articleId', {
        articleId,
      });
    if (!Number.isNaN(commentId))
      qb.andWhere('reply.commentId = :commentId', {
        commentId,
      });
    const data = await qb.getRawMany();
    return this._response.success({
      data,
    });
  }
}
