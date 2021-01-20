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
import fs from 'fs';
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
  @ApiOperation({ summary: '注册' })
  async create(@Body() body: CreateUserDTO) {
    await this._userService.create(body);
    return {
      message: 'success',
    };
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: GlobalType.UploadFile) {
    let writePath: string;
    if (this._libService.isDev) {
      writePath = `${__dirname}/${file.originalname}`;
    } else {
      writePath = `${this._configService.get<string>('AVATAR_PATH')}/${
        file.originalname
      }`;
    }
    const writeStream = fs.createWriteStream(writePath);
    const resPromise = new Promise((reslove, rejecet) => {
      writeStream.write(file.buffer, (err) => {
        if (err) {
          console.log('error:', err);

          rejecet(err);
        } else {
          reslove({
            message: 'success',
            code: 200,
          });
        }
      });
    });
    const res = await resPromise;
    return res;
  }
  @Put()
  async update(@Body() body: any) {
    return await this._userService.update(body.id);
    // return body;
  }
}
