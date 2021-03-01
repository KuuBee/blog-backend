import { Controller, Get, Param } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private _tag: TagService) {}
  @Get()
  index() {
    return this._tag.index();
  }

  @Get(':id')
  info(@Param('id') id) {
    return this._tag.info(id);
  }
}
