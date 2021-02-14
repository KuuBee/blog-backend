import { IndexSearchDTO } from '@app/lib/dto/search/index.dto';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private _search: SearchService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  index(@Query() query: IndexSearchDTO) {
    return this._search.index(query);
  }
}
