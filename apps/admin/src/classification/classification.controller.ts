import { CreateClassificationDTO } from '@app/lib/dto/classification/create.dto';
import { IndexClassificationDTO } from '@app/lib/dto/classification/index.dto';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { ClassificationService } from './classification.service';

@Controller('classification')
export class ClassificationController {
  constructor(private _classificationService: ClassificationService) {}
  @ApiOperation({ summary: '分类列表' })
  @UseGuards(AuthGuard('jwt'))
  @Get()
  index(@Query() query: IndexClassificationDTO) {
    return this._classificationService.index(query);
  }

  @ApiOperation({ summary: '创建分类' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: CreateClassificationDTO) {
    return this._classificationService.create(body);
  }
}
