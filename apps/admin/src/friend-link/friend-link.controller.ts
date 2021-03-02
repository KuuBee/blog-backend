import { IndexFriendLinkDTO } from '@app/lib/dto/friend-link/index.dto';
import { UpdatePartFriendLinkDTO } from '@app/lib/dto/friend-link/update.dto';
import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendLinkService } from './friend-link.service';

@Controller('friend-link')
export class FriendLinkController {
  constructor(private _riendLink: FriendLinkService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(@Query() query: IndexFriendLinkDTO) {
    return this._riendLink.index(query);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() body: UpdatePartFriendLinkDTO) {
    return this._riendLink.updatePart(body);
  }
}
