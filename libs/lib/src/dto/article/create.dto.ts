/*
 * @Descripttion: 文章上传DTO
 * @Author: KuuBee
 * @Date: 2021-02-11 12:40:11
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-12 11:16:13
 */

import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsNumberString()
  classificationId: number;
  @IsNotEmpty()
  // @IsArray()
  tagId: string;
}
