/*
 * @Descripttion: friend_link 实体
 * @Author: 杨湛杰
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-15 16:47:44
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/date/date.service';

export enum FriendLinkStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
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
  link: string;

  @Column({
    type: 'enum',
    enum: FriendLinkStatus,
    default: () => FriendLinkStatus.ENABLE,
  })
  status: FriendLinkStatus;

  @Column({
    length: 20,
    nullable: true,
  })
  color: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    transformer: {
      from(val) {
        return DateService.format(val);
      },
      to() {
        return null;
      },
    },
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    transformer: {
      from(val) {
        return DateService.format(val);
      },
      to() {
        return null;
      },
    },
  })
  updatedAt: string;

  @Column({
    name: 'delete_at',
    type: 'timestamptz',
    nullable: true,
  })
  deleteAt: string;
}
