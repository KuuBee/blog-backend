import { IndexFriendLinkDTO } from '@app/lib/dto/friend-link/index.dto';
import { UpdatePartFriendLinkDTO } from '@app/lib/dto/friend-link/update.dto';
import {
  FriendLinkEntity,
  FriendLinkStatus,
} from '@app/lib/entity/friend-link.entity';
import { UserEntity } from '@app/lib/entity/user.entity';
import { EmailService } from '@app/lib/service/email/email.service';
import { PaginationService } from '@app/lib/service/pagination/pagination.service';
import { ResponseService } from '@app/lib/service/response.service';
import { UtilsService } from '@app/lib/service/utils.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';

@Injectable()
export class FriendLinkService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(FriendLinkEntity)
    private _repository: Repository<FriendLinkEntity>,
    private _pagination: PaginationService,
    private _utils: UtilsService,
    private _email: EmailService,
  ) {}
  async index({ page, pageSize }: IndexFriendLinkDTO) {
    const data = await this._pagination.pagination({
      queryBuilder: this._repository
        .createQueryBuilder('fl')
        .select([
          'fl.linkId',
          'fl.userId',
          'fl.title',
          'fl.subtitle',
          'fl.link',
          'fl.avatarLink',
          'fl.status',
          'fl.createdAt',
        ])
        .orderBy({
          'fl.createdAt': 'DESC',
        }),
      page,
      pageSize,
    });
    return this._response.success({
      data,
    });
  }

  // 更新部分
  async updatePart(body: UpdatePartFriendLinkDTO, id: number) {
    const { linkId, oldStatus, status } = body;
    await getConnection().transaction(async (t) => {
      await t
        .createQueryBuilder()
        .update(FriendLinkEntity)
        .set(this._utils.omit(body, 'linkId', 'oldStatus'))
        .where('linkId = :linkId', {
          linkId,
        })
        .execute();
      await t
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          linkId,
        })
        .where('userId = :id', {
          id,
        })
        .execute();
      // 如果状态是从 审核中 -> 启用 就发邮件通知
      if (
        oldStatus &&
        oldStatus === FriendLinkStatus.UNDER_ERVIEW &&
        status === FriendLinkStatus.ENABLE
      ) {
        const { email } = await t.findOne(UserEntity, id, {
          select: ['email'],
        });
        this._email.send({
          subject: '友链审核通知',
          to: email,
          html: `
          <b>您的友链审核已经通过</b>
          </br>
          <div>访问<a href="https://autocode.icu/blog/friend-link target="_blank"">此链接</a>查看</div>
          `,
        });
      }
    });
    // await this._repository
    //   .createQueryBuilder()
    //   .update(FriendLinkEntity)
    //   .set(this._utils.omit(body, 'linkId'))
    //   .where('linkId = :id', {
    //     id: body.linkId,
    //   })
    //   .execute();
    return this._response.success({
      message: '更新成功！',
    });
  }
}
