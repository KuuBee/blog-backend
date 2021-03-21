import { GetArticlePageContextDTO } from '@app/lib/dto/rpc/getArticlePageContext.dto';
import { Controller, Get, Query } from '@nestjs/common';
import { RpcService } from './rpc.service';
/* 
RPC 风格的api放在此处
*/
@Controller('rpc')
export class RpcController {
  constructor(private _rpc: RpcService) {}

  @Get('getBlogInfo')
  getBlogInfo() {
    return this._rpc.getBlogInfo();
  }

  @Get('getArticlePageContext')
  getArticlePageContext(@Query() { id }: GetArticlePageContextDTO) {
    return this._rpc.getArticlePageContext(parseInt(id));
  }
}
