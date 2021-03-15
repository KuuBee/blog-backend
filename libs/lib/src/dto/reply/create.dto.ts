/*
 * @Descripttion: 创建回复DTO
 * @Author: KuuBee
 * @Date: 2021-03-05 11:14:36
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-05 11:14:36
 */

import { ReplyType } from '@app/lib/entity/reply.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateReplyDTO {
  @IsNotEmpty()
  @IsNumber()
  articleId: number;
  @IsNotEmpty()
  @IsNumber()
  commentId: number;
  @IsOptional()
  @IsNumber()
  // 但回复类型为回复时
  // 需要回复的回复id
  replyId?: number;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsString()
  os: string;
  @IsNotEmpty()
  @IsString()
  browser: string;
  @IsNotEmpty()
  @IsEnum(ReplyType)
  replyType: ReplyType;
}
