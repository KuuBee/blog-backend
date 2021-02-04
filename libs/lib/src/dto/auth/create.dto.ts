/*
 * @Descripttion:
 * @Author: KuuBee
 * @Date: 2021-01-13 16:36:45
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-13 16:36:46
 */
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAuthDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;
  @IsNotEmpty()
  @IsString()
  password!: string;
}
