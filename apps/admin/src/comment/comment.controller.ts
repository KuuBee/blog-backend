import { IndexCommentDTO } from '@app/lib/dto/comment/index.dto';
import { UpdatePartCommentDTO } from '@app/lib/dto/comment/update.dto';
import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private _comment: CommentService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(@Query() query: IndexCommentDTO.Admin) {
    return this._comment.index(query);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updatePart(@Body() body: UpdatePartCommentDTO) {
    return this._comment.updatePart(body);
  }
}
