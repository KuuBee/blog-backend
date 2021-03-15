/*
 * @Descripttion: 评论列表DTO
 * @Author: KuuBee
 * @Date: 2021-03-07 13:38:56
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-07 13:38:57
 */

import { IsNotEmpty, IsNumberString } from 'class-validator';
import { extend } from 'lodash';
import { PaginationDTO } from '../pagination';

// export namespace Web {
//   export class IndexCommentDTO {
//     @IsNotEmpty()
//     @IsNumberString()
//     articleId: string;
//   }
// }

export namespace IndexCommentDTO {
  export class Web {
    @IsNotEmpty()
    @IsNumberString()
    articleId: string;
  }
  export class Admin extends PaginationDTO {}
}
