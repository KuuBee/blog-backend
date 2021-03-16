/*
 * @Descripttion: 更新友链DTO
 * @Author: KuuBee
 * @Date: 2021-03-02 09:55:49
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 10:19:07
 */

import { FriendLinkStatus } from '@app/lib/entity/friend-link.entity';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

// 更新部分数据
export class UpdatePartFriendLinkDTO {
  @IsNotEmpty()
  @IsNumber()
  linkId: number;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  title?: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  subtitle?: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsUrl({
    protocols: ['https'],
  })
  link?: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @IsUrl({
    protocols: ['https'],
  })
  avatarLink?: string;
  @IsOptional()
  @IsEnum(FriendLinkStatus)
  status?: FriendLinkStatus;
  @IsOptional()
  @IsEnum(FriendLinkStatus)
  // 旧的状态
  oldStatus?: FriendLinkStatus;
}
