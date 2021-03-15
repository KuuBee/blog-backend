import { CreateReplyDTO } from '@app/lib/dto/reply/create.dto';
import { IndexReplyDTO } from '@app/lib/dto/reply/index.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReplyService } from './reply.service';

@Controller('reply')
export class ReplyController {
  constructor(private _reply: ReplyService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() body: CreateReplyDTO,
    @Request() { user: { userId } },
    @Request() q,
  ) {
    return this._reply.create(body, userId);
  }
  @Get()
  index(@Query() { articleId, commentId }: IndexReplyDTO.Web) {
    return this._reply.index(parseInt(articleId), parseInt(commentId));
  }
}
