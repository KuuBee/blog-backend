/*
 * @Descripttion: tag 实体
 * @Author: KuuBee
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-03 09:48:46
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';
import { ArticleEntity } from './article.entity';
import { UserEntity } from './user.entity';

export enum TagStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
@Entity({
  name: 'tag',
})
export class TagEntity {
  @PrimaryGeneratedColumn({
    name: 'tag_id',
    type: 'int',
  })
  tagId: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: TagStatus,
    default: TagStatus.ENABLE,
  })
  status: TagStatus;

  @Column({
    type: 'int4',
    default: '0',
  })
  count: number;

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
  @ManyToMany(() => ArticleEntity, (article) => article.tag)
  article: ArticleEntity;
}
