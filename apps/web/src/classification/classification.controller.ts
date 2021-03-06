import { Controller, Get, Param } from '@nestjs/common';
import { ClassificationService } from './classification.service';

@Controller('classification')
export class ClassificationController {
  constructor(private _classification: ClassificationService) {}

  @Get()
  index() {
    return this._classification.index();
  }

  @Get(':id')
  info(@Param('id') id: string) {
    return this._classification.info(id);
  }
}
