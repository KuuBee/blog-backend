/*
 * @Descripttion: friend_link 实体
 * @Author: KuuBee
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-15 16:47:44
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';

export enum FriendLinkStatus {
  // 启用
  ENABLE = 'enable',
  // 禁用
  DISABLE = 'disable',
  // 审核中
  UNDER_ERVIEW = 'under_review',
}
@Entity({
  name: 'friend_link',
})
export class FriendLinkEntity {
  @PrimaryGeneratedColumn({
    name: 'link_id',
    type: 'int',
  })
  linkId: number;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  userId: number;

  @Column({
    name: 'title',
    length: 30,
  })
  title: string;

  @Column({
    nullable: true,
  })
  subtitle: string;

  @Column()
  // 博客地址链接
  link: string;

  @Column({
    name: 'avatar_link',
  })
  avatarLink: string;

  @Column({
    type: 'enum',
    enum: FriendLinkStatus,
    default: FriendLinkStatus.ENABLE,
  })
  status: FriendLinkStatus;

  @Column({
    length: 20,
    nullable: true,
  })
  // 备用字段
  color: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    transformer: DateService.transformer(),
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    transformer: DateService.transformer(),
  })
  updatedAt: string;
}
