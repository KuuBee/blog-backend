import { CreateCommentDTO } from '@app/lib/dto/comment/create.dto';
import { CommentEntity, CommentStatus } from '@app/lib/entity/comment.entity';
import {
  FriendLinkEntity,
  FriendLinkStatus,
} from '@app/lib/entity/friend-link.entity';
import { ReplyEntity } from '@app/lib/entity/reply.entity';
import { ResponseService } from '@app/lib/service/response.service';
import { XssService } from '@app/lib/service/xss/xss.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(CommentEntity)
    private _repository: Repository<CommentEntity>,
    private _xss: XssService,
  ) {}
  async create(body: CreateCommentDTO, userId: number) {
    const [, count] = await this._repository.findAndCount({
      where: {
        userId,
      },
    });
    if (count >= 10)
      return this._response.error({
        message: '每个用户只能评论10次哦:(',
      });
    await this._repository.save({
      ...body,
      userId,
      content: this._xss.filterXSS(body.content),
      status: CommentStatus.ENABLE,
    });
    return this._response.success({
      data: body,
      message: '评论成功！',
    });
  }

  async index(id: number) {
    const data = await this._repository
      .createQueryBuilder('comment')
      .select([
        'comment.commentId "commentId"',
        'comment.content "content"',
        'comment.os "os"',
        'comment.browser "browser"',
        'comment.createdAt "createdAt"',
        'user.name "name"',
        'user.avatar "avatar"',
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
      .addSelect((subQuery) => {
        return subQuery
          .select('COUNT(reply.commentId)')
          .from(ReplyEntity, 'reply')
          .where('reply.commentId = comment.commentId');
      }, 'replyCount')
      .innerJoin('comment.user', 'user')
      .where('comment.status = :status', {
        status: CommentStatus.ENABLE,
      })
      .andWhere('comment.articleId = :id', {
        id,
      })
      .orderBy('comment.createdAt', 'DESC')
      .getRawMany();
    return this._response.success({
      data,
    });
  }
}
