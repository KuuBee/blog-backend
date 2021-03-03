/*
 * @Descripttion: 创建token
 * @Author: KuuBee
 * @Date: 2021-03-03 13:31:40
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-03 13:31:40
 */

import { IsNotEmpty, IsString } from 'class-validator';
export class CreateTokenDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsString()
  password!: string;
}
