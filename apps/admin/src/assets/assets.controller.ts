import { Controller, Get, Param } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private _assetsService: AssetsService) {}

  @Get('menu')
  menu() {
    return this._assetsService.menu();
  }
  @Get('i18n/zh-CN')
  i18n() {
    return this._assetsService.i18n('zh-CN');
  }
}
