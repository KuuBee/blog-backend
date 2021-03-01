/*
 * @Descripttion: 创建友链DTO
 * @Author: KuuBee
 * @Date: 2021-03-01 14:28:27
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-01 14:31:05
 */

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateFriendLinkDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  subtitle: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  link: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  avatarLink: string;
}
