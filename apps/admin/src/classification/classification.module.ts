import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { ClassificationController } from './classification.controller';
import { ClassificationService } from './classification.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [ClassificationController],
  providers: [ClassificationService],
})
export class ClassificationModule {}
