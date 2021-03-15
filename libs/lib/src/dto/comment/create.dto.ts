/*
 * @Descripttion: 创建评论DTO
 * @Author: KuuBee
 * @Date: 2021-03-05 09:53:25
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-05 09:53:25
 */

import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsNumber()
  articleId: number;
  @IsNotEmpty()
  @IsString()
  @MaxLength(3000)
  content: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  os: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  browser: string;
}
