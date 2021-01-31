import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO } from '@app/lib/dto/user/cteate.dto';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { GlobalType } from '@app/lib/interface';
import { LibService } from '@app/lib';
import { ConfigService } from '@nestjs/config';

@Controller('user')
export class UserController {
  constructor(
    private _userService: UserService,
    private _libService: LibService,
    private _configService: ConfigService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Post()
  // @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: '注册' })
  async create(
    @Body() body: CreateUserDTO,
    @UploadedFile() avatar: GlobalType.UploadFile,
  ) {
    return this._userService.create(body, avatar);
  }

  @Put()
  async update(@Body() body: any) {
    return await this._userService.update(body.id);
    // return body;
  }
}
