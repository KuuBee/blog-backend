import { CreateCommentDTO } from '@app/lib/dto/comment/create.dto';
import { IndexCommentDTO } from '@app/lib/dto/comment/index.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private _comment: CommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() body: CreateCommentDTO, @Request() { user: { userId } }) {
    return this._comment.create(body, userId);
  }

  @Get()
  index(@Query() { articleId }: IndexCommentDTO.Web) {
    return this._comment.index(parseInt(articleId));
  }
}
