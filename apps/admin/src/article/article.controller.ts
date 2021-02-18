import { CreateArticleDTO } from '@app/lib/dto/article/create.dto';
import { IndexArticleDTO } from '@app/lib/dto/article/index.dto';
import { UpdateArticleDTO } from '@app/lib/dto/article/update.dto';
import { GlobalType } from '@app/lib/interface';
import { ArrayParsePipe } from '@app/lib/pipe/nest-array-parse.pipe';
import { ParseJsonPipe } from '@app/lib/pipe/parse-json.pipe';
import { ResponseService } from '@app/lib/service/response.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleService } from './article.service';

const fileFilter = (req, file, cb) => {
  // 仅限部分压缩包
  if (/\/(zip)$/gi.test(file.mimetype)) {
    return cb(null, true);
  }
  cb(new HttpException('你tmd会不会传文件啊', HttpStatus.BAD_REQUEST), false);
};

@Controller('article')
export class ArticleController {
  constructor(private _articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  create(
    @UploadedFile() file: GlobalType.UploadFile,
    @Body() body: CreateArticleDTO,
  ) {
    return this._articleService.create(file, body);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  index(@Query() query: IndexArticleDTO) {
    return this._articleService.index(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  info(@Param('id') id: string) {
    return this._articleService.info(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter,
    }),
  )
  update(
    @UploadedFile() file: GlobalType.UploadFile,
    @Param('id') id: number,
    @Body()
    body: UpdateArticleDTO,
  ) {
    return this._articleService.update(file, id, body);
  }
}
