import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO } from '@app/lib/dto/user/cteate.dto';
import { AuthGuard } from '@nestjs/passport';
import { GlobalType } from '@app/lib/interface';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}
  @Post()
  @ApiOperation({ summary: '注册' })
  async create(
    @Body() body: CreateUserDTO,
    @UploadedFile() avatar: GlobalType.UploadFile,
  ) {
    return this._userService.create(body, avatar);
  }
}
