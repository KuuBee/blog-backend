/*
 * @Descripttion: articleLike 实体
 * @Author: KuuBee
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-15 16:23:14
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';

export enum ClassificationStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
@Entity({
  name: 'classification',
})
export class ArticleLike {
  @PrimaryGeneratedColumn({
    name: 'article_like_id',
    type: 'int',
  })
  articleLikeId: number;

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
    type: 'int2',
  })
  type: number;

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
}
