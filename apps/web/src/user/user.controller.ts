import { Body, Controller, Get, Post, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}
  @Get()
  findAll() {
    return this._userService.findAll();
  }
  @Post()
  create() {
    return this._userService.create();
  }
  @Put()
  async update(@Body() body: any) {
    console.log(body);
    return await this._userService.update(body.id);
    // return body;
  }
}
