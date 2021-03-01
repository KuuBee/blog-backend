import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendLinkService } from './friend-link.service';

@Controller('friend-link')
export class FriendLinkController {
  constructor(private _friendLink: FriendLinkService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create() {
    return this._friendLink.create();
  }
}
