import { CreateFriendLinkDTO } from '@app/lib/dto/friend-link/create.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendLinkService } from './friend-link.service';

@Controller('friend-link')
export class FriendLinkController {
  constructor(private _friendLink: FriendLinkService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateFriendLinkDTO, @Request() { user }) {
    return this._friendLink.create(body, user);
  }

  @Get()
  index() {
    return this._friendLink.index();
  }
}
