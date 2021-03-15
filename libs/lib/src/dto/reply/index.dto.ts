/*
 * @Descripttion: 回复列表DTO
 * @Author: KuuBee
 * @Date: 2021-03-08 09:31:24
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-08 09:31:25
 */

import { IsNumberString, IsOptional } from 'class-validator';
import { PaginationDTO } from '../pagination';

export namespace IndexReplyDTO {
  export class Web {
    @IsOptional()
    @IsNumberString()
    articleId?: string;
    @IsOptional()
    @IsNumberString()
    commentId?: string;
  }
  export class Admin extends PaginationDTO {}
}
