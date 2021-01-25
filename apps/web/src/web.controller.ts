import { Controller, Get } from '@nestjs/common';
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
}
