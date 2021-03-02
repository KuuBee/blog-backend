/*
 * @Descripttion: 回复实体
 * @Author: KuuBee
 * @Date: 2021-03-02 15:31:00
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 15:36:24
 */

import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '../service/date.service';

/* 
其实这是一个残废的回复表
*/

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
    nullable: true,
    comment: '当回复评论时 存这个',
  })
  // TODO
  // 便于文章评论检索
  commentId: number;

  @Column({
    type: 'int',
    name: 'reply_id',
    nullable: true,
    comment: '当回复回复时 存这个',
  })
  // TODO
  // 需要一对多
  // 当回复回复时 存这个
  replyId: number;

  @Column({
    type: 'int',
    name: 'user_id',
    comment: '回复的用户id',
  })
  // TODO
  // 一对一
  userId: number;

  @Column({
    length: 3000,
    type: 'varchar',
    comment: '回复的具体内容',
  })
  // 最多3k字节
  content: string;

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
