import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { FriendLinkController } from './friend-link.controller';
import { FriendLinkService } from './friend-link.service';

@Module({
  controllers: [FriendLinkController],
  providers: [FriendLinkService],
  imports: [LibModule],
})
export class FriendLinkModule {}
