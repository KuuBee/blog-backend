import { CreateArticleDTO } from '@app/lib/dto/article/create.dto';
import { IndexArticleDTO } from '@app/lib/dto/article/index.dto';
import { GlobalType } from '@app/lib/interface';
import { ResponseService } from '@app/lib/service/response.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(
    private _articleService: ArticleService,
    private _responseService: ResponseService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        // 仅限部分压缩包
        if (/\/(zip)$/gi.test(file.mimetype)) {
          return cb(null, true);
        }
        cb(
          new HttpException('你tmd会不会传文件啊', HttpStatus.BAD_REQUEST),
          false,
        );
      },
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
}
