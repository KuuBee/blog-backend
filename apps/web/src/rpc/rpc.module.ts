import { ALL_ENTITY, LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { RpcController } from './rpc.controller';
import { RpcService } from './rpc.service';

@Module({
  imports: [LibModule, ...ALL_ENTITY],
  controllers: [RpcController],
  providers: [RpcService],
})
export class RpcModule {}
