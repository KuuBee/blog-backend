/*
 * @Descripttion: comment 实体
 * @Author: 杨湛杰
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-15 16:12:57
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/date/date.service';

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
    name: 'parent_comment_id',
    type: 'int',
    nullable: true,
  })
  parentCommentId: number;

  @Column({
    name: 'parent_comment_user_id',
    type: 'int',
    nullable: true,
  })
  parentCommentUserId: number;

  @Column({
    name: 'reply_comment_id',
    type: 'int',
    nullable: true,
  })
  replyCommentId: number;

  @Column({
    name: 'reply_comment_user_id',
    type: 'int',
    nullable: true,
  })
  replyCommentUserId: number;

  @Column({
    name: 'comment_os',
    length: 30,
    nullable: true,
  })
  commentOs: string;

  @Column({
    name: 'comment_browser',
    length: 30,
    nullable: true,
  })
  commentBrowser: string;

  @Column({
    name: 'comment_browser',
    length: 2000,
  })
  content: string;

  @Column({
    type: 'enum',
    enum: CommentStatus,
    default: () => CommentStatus.ENABLE,
  })
  status: CommentStatus;

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
