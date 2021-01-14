/*
 * @Descripttion:
 * @Author: 杨湛杰
 * @Date: 2021-01-13 16:36:45
 * @LastEditors: 杨湛杰
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
