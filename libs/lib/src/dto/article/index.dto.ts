/*
 * @Descripttion: 文章列表DTO
 * @Author: KuuBee
 * @Date: 2021-02-12 13:31:31
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-12 13:31:31
 */
import { IsNumberString, IsOptional } from 'class-validator';
import { PaginationDTO } from '../pagination';

export class IndexArticleDTO extends PaginationDTO {
  @IsOptional()
  @IsNumberString()
  tagId?: string;

  @IsOptional()
  @IsNumberString()
  classificationId?: string;
}
