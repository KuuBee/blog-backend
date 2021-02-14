/*
 * @Descripttion: 搜索列表DTO
 * @Author: KuuBee
 * @Date: 2021-02-11 13:52:43
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-11 13:52:43
 */

import { IsEnum, IsNotEmpty } from 'class-validator';

export enum SearchType {
  TAG = 'tag',
  CLASSIFICATION = 'classification',
  ARTICLE = 'article',
}

export class IndexSearchDTO {
  @IsNotEmpty()
  @IsEnum(SearchType)
  type: SearchType;
}
