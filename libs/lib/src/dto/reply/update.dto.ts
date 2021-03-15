/*
 * @Descripttion: 更新回复DTO
 * @Author: KuuBee
 * @Date: 2021-03-11 15:58:22
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-11 15:58:22
 */

import { ReplyStatus } from '@app/lib/entity/reply.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePartReplyDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsOptional()
  @IsEnum(ReplyStatus)
  status: ReplyStatus;
}
