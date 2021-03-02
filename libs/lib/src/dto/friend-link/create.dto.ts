/*
 * @Descripttion: 创建友链DTO
 * @Author: KuuBee
 * @Date: 2021-03-01 14:28:27
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-01 20:44:12
 */

import { IsNotEmpty, IsString, IsUrl, MaxLength } from 'class-validator';

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
  @IsUrl({
    protocols: ['https'],
  })
  link: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @IsUrl({
    protocols: ['https'],
  })
  avatarLink: string;
}
