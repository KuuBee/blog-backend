import { EmailService } from '@app/lib/service/email/email.service';
import { PushService } from '@app/lib/service/push/push.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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
  async postHello(@Body() body, @Query() query) {
    // console.log('body:', body);
    // console.log('query:', query);
    // this.webService.getHello()
    // await this._m.send();
    return {
      message: 'success',
      body,
      query,
    };
  }
}
