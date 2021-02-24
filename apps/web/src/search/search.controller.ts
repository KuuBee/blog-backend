import { IndexSearchDTO } from '@app/lib/dto/search/index.dto';
import { SearchService } from '@app/lib/service/search/search.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('search')
export class SearchController {
  constructor(private _search: SearchService) {}
  @Get()
  index(@Query() query: IndexSearchDTO) {
    return this._search.index(query);
  }
}
