import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private _tag: TagService) {}
  @Get()
  index() {
    return this._tag.index();
  }
}
