/*
 * @Descripttion: article 实体
 * @Author: 杨湛杰
 * @Date: 2021-01-13 09:55:21
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-17 14:44:22
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/date/date.service';

export enum ArticleStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
@Entity({
  name: 'article',
})
export class ArticleEntity {
  @PrimaryGeneratedColumn({
    name: 'article_id',
    type: 'int',
  })
  articleId: number;

  @Column()
  title: string;

  @Column({
    name: 'article_link',
    length: 1000,
  })
  articleLink: string;

  @Column({
    name: 'classification_id',
    type: 'int',
  })
  classificationId: number;

  @Column({
    name: 'tag_id',
    type: 'int',
    array: true,
    nullable: true,
  })
  tagId: number[];

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: () => ArticleStatus.ENABLE,
  })
  status: ArticleStatus;

  @Column({
    name: 'link_id',
    type: 'int',
  })
  linkId: number;

  @Column({
    name: 'like_count',
    type: 'int',
    default: 0,
  })
  likeCount: number;

  @Column({
    name: 'dislike_count',
    type: 'int',
    default: 0,
  })
  dislikeCount: number;

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
