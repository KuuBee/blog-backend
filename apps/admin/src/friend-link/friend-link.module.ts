import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { FriendLinkController } from './friend-link.controller';
import { FriendLinkService } from './friend-link.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [FriendLinkController],
  providers: [FriendLinkService],
})
export class FriendLinkModule {}
