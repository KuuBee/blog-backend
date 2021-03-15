/*
 * @Descripttion: 更新评论
 * @Author: KuuBee
 * @Date: 2021-03-09 15:40:14
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-09 15:40:14
 */

import { CommentStatus } from '@app/lib/entity/comment.entity';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdatePartCommentDTO {
  @IsNotEmpty()
  @IsNumber()
  commentId: number;
  @IsOptional()
  @IsEnum(CommentStatus)
  status: CommentStatus;
}
