import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendLinkService {
  constructor(private _response: ResponseService) {}
  create() {
    return this._response.success({
      message: '申请已经提交啦，通过会有邮件提醒哦',
    });
  }
}
