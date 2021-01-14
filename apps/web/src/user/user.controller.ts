import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserDTO } from '@app/lib/dto/user/cteate.dto';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}
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
  @Put()
  async update(@Body() body: any) {
    return await this._userService.update(body.id);
    // return body;
  }
}
