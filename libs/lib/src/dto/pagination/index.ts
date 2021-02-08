/*
 * @Descripttion: 分页DTO
 * @Author: KuuBee
 * @Date: 2021-02-04 14:46:35
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-04 14:48:27
 */

import { IsOptional } from 'class-validator';
export class PaginationDTO {
  @IsOptional()
  page?: number;
  @IsOptional()
  pageSize?: number;
}
