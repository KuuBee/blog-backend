/*
 * @Descripttion: 回复实体
 * @Author: KuuBee
 * @Date: 2021-03-02 15:31:00
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 17:01:14
 */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DateService } from '../service/date.service';
import { CommentEntity } from './comment.entity';
import { UserEntity } from './user.entity';

/* 
reply表只管理回复评论的评论和
*/
export enum ReplyType {
  REPLY = 'reply',
  COMMENT = 'comment',
}

@Entity({
  name: 'reply',
})
export class ReplyEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    comment: '主键',
  })
  // 主键
  // 历史遗留问题就叫id了。。。
  // 不叫 replyId 的原因是和表内的 replyId 重复了
  id: number;

  @Column({
    type: 'int',
    comment: '当回复评论时 存这个',
    name: 'comment_id',
  })
  commentId: number;

  @Column({
    type: 'int',
    name: 'reply_id',
    nullable: true,
    comment: '当回复回复时此值为回复的回复id，当回复评论时此值为null',
  })
  replyId: number;

  @Column({
    type: 'enum',
    enum: ReplyType,
    enumName: 'reply_type',
    comment: '回复类型，可能为评论回复和回复回复',
  })
  replyType: ReplyType;

  @Column({
    type: 'int',
    name: 'user_id',
    comment: '回复的用户id',
  })
  userId: number;

  @Column({
    length: 3000,
    type: 'varchar',
    comment: '回复的具体内容',
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

  @ManyToOne(() => CommentEntity, (comment) => comment.reply)
  @JoinColumn({
    name: 'comment_id',
  })
  comment: CommentEntity;
  @ManyToOne(() => UserEntity, (user) => user.reply)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;
}
