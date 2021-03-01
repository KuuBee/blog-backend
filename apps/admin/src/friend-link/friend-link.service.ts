import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendLinkService {
  constructor(private _response: ResponseService) {}
  index() {
    return this._response.success();
  }
}
