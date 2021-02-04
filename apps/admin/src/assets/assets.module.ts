import { LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { AssetsService } from './assets.service';

@Module({
  imports: [LibModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
