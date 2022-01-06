/*
 * @Descripttion: 更新文章DTO
 * @Author: KuuBee
 * @Date: 2021-02-17 23:05:15
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-18 14:14:39
 */

import {
  IsJSON,
  IsNotEmpty,
  IsNumberString,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateArticleDTO {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsNumberString()
  classificationId: string;
  @IsNotEmpty()
  @IsJSON()
  @MinLength(3)
  tagId: string;
  @IsNotEmpty()
  @IsString()
  introduction: string;
}
