/*
 * @Descripttion: 评论实体
 * @Author: KuuBee
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 14:59:03
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';

export enum CommentStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
  UNDER_ERVIEW = 'under_review',
}
@Entity({
  name: 'comment',
})
export class CommentEntity {
  @PrimaryGeneratedColumn({
    name: 'comment_id',
    type: 'int',
  })
  commentId: number;

  @Column({
    name: 'user_id',
    type: 'int',
  })
  userId: number;

  @Column({
    name: 'article_id',
    type: 'int',
  })
  articleId: number;

  @Column({
    length: 3000,
    type: 'varchar',
  })
  // 最多3k字节
  content: string;
  @Column({
    name: 'comment_os',
    length: 30,
    nullable: true,
  })
  os: string;

  @Column({
    name: 'comment_browser',
    length: 30,
    nullable: true,
  })
  browser: string;

  @Column({
    type: 'enum',
    enum: CommentStatus,
    default: CommentStatus.ENABLE,
  })
  status: CommentStatus;

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
