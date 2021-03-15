import { IndexFriendLinkDTO } from '@app/lib/dto/friend-link/index.dto';
import { UpdatePartFriendLinkDTO } from '@app/lib/dto/friend-link/update.dto';
import { FriendLinkEntity } from '@app/lib/entity/friend-link.entity';
import { UserEntity } from '@app/lib/entity/user.entity';
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
    const { linkId } = body;
    await getConnection().transaction(async (t) => {
      await t
        .createQueryBuilder()
        .update(FriendLinkEntity)
        .set(this._utils.omit(body, 'linkId'))
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
