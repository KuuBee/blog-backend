import { CreateFriendLinkDTO } from '@app/lib/dto/friend-link/create.dto';
import {
  FriendLinkEntity,
  FriendLinkStatus,
} from '@app/lib/entity/friend-link.entity';
import { EmailService } from '@app/lib/service/email/email.service';
import { JwtValidateInfo } from '@app/lib/service/jwt.service';
import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendLinkService {
  constructor(
    private _response: ResponseService,
    @InjectRepository(FriendLinkEntity)
    private _repository: Repository<FriendLinkEntity>,
    private _email: EmailService,
  ) {}
  async create(body: CreateFriendLinkDTO, { userId }: JwtValidateInfo) {
    const [, count] = await this._repository.findAndCount({
      userId,
    });
    if (count)
      return this._response.error({
        message: '每个人只能提交一次申请 :P',
      });
    await this._repository.save({
      userId,
      ...body,
      status: FriendLinkStatus.UNDER_ERVIEW,
    });
    // 您的后台地址
    const BACKEND_URL = 'https://autocode.icu/admin/friend-link/index';
    // 异步
    this._email.send({
      html: `
      有新的小伙伴申请友链啦，快去<a href="${BACKEND_URL}" target="_blank">后台</a>康康吧！
      `,
      subject: '有新的友链',
      to: this._email.rootEmail,
    });
    return this._response.success({
      message: '申请已经提交啦，通过会有邮件提醒哦',
    });
  }
  async index() {
    const data = await this._repository.find({
      select: ['avatarLink', 'title', 'subtitle', 'link'],
      where: {
        status: FriendLinkStatus.ENABLE,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return this._response.success({
      data,
    });
  }
}
