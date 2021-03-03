/*
 * @Descripttion: 评论实体
 * @Author: KuuBee
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 17:03:30
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';
import { type } from 'os';
import { ReplyEntity } from './reply.entity';
import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';

export enum CommentStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
  UNDER_ERVIEW = 'under_review',
}

/* 
comment表 只负责管理回复文章的评论
*/
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
    name: 'os',
    length: 100,
    nullable: true,
  })
  os: string;

  @Column({
    name: 'browser',
    length: 100,
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

  // 关系
  @OneToMany(() => ReplyEntity, (reply) => reply.comment, { cascade: true })
  reply: ReplyEntity[];
  @ManyToOne(() => UserEntity, (user) => user.comment)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
  @ManyToOne(() => ArticleEntity, (article) => article.comment)
  @JoinColumn({
    name: 'article_id',
  })
  article: ArticleEntity;
}
