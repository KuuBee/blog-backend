import { IsNotEmpty, IsNumberString } from 'class-validator';

/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2021-03-21 14:52:52
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-21 14:53:53
 */
export class GetArticlePageContextDTO {
  @IsNotEmpty()
  @IsNumberString()
  id: string;
}
