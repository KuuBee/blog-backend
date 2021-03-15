import { IndexReplyDTO } from '@app/lib/dto/reply/index.dto';
import { UpdatePartReplyDTO } from '@app/lib/dto/reply/update.dto';
import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
  constructor(private _reply: ReplyService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(@Query() query: IndexReplyDTO.Admin) {
    return this._reply.index(query);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updatePart(@Body() body: UpdatePartReplyDTO) {
    return this._reply.updatePart(body);
  }
}
