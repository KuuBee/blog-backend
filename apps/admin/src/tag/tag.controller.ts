import { CreateTagDTO } from '@app/lib/dto/tag/create.dto';
import { IndexTagDTO } from '@app/lib/dto/tag/index.dto';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private _tagService: TagService) {}
  @ApiOperation({ summary: '标签列表' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  index(@Query() query: IndexTagDTO) {
    return this._tagService.index(query);
  }
  @ApiOperation({ summary: '创建标签' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateTagDTO) {
    return this._tagService.create(body);
  }
}
