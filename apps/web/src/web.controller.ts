import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { identity } from 'lodash';
import { WebService } from './web.service';

@Controller()
@ApiTags('默认')
export class WebController {
  constructor(private readonly webService: WebService) {}

  @Get()
  getHello() {
    return this.webService.getHello();
  }
  @Post()
  postHello(@Body() body, @Query() query) {
    // console.log('body:', body);
    // console.log('query:', query);
    // this.webService.getHello()
    return {
      message: 'success',
      body,
      query,
    };
  }
}
