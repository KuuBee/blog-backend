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
import * as fsPromises from 'fs/promises';
import fs from 'fs';
import { GlobalType } from '@app/lib/interface';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}
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
    const writePath = `${__dirname}/${file.originalname}`;
    const writeStream = fs.createWriteStream(writePath);
    writeStream.write(file.buffer);
    // try {
    //   // console.log(file.mimetype.split('image/')[1]);
    //   const res = await fsPromises.stat(writePath);
    //   console.log(res);
    //   // await fsPromises.rm(writePath);
    //   writeStream.write(file.buffer);
    // } catch (error) {
    //   console.log(error);
    //   writeStream.write(file.buffer);
    // }

    // fs.stat(writePath, (err, stat) => {
    //   if (stat) {
    //     console.log('有数据');

    //     fs.rmSync(writePath);
    //     console.log('删除');

    //     writeStream.write(file.buffer, (err) => {
    //       console.log('写的进度:' + err);
    //     });
    //   } else {
    //     console.log('没有数据');

    //     writeStream.write(file.buffer, (err) => {
    //       console.log('写的进度:' + err);
    //     });
    //   }
    // });
    // fs.readFile
  }
  @Put()
  async update(@Body() body: any) {
    return await this._userService.update(body.id);
    // return body;
  }
}
