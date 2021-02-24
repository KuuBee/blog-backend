/*
 * @Descripttion: article 实体
 * @Author: KuuBee
 * @Date: 2021-01-13 09:55:21
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-19 14:21:54
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';
import { ClassificationEntity } from './classification.entity';
import { TagEntity } from './tag.entity';

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

  // 映射关系
  @OneToOne(() => ClassificationEntity)
  @JoinColumn({ name: 'classification_id' })
  classification?: ClassificationEntity;

  @Column({
    name: 'tag_id',
    type: 'int',
    array: true,
    nullable: true,
  })
  tagId: number[];

  @Column({
    name: 'first_paragraph',
    type: 'varchar',
    length: 1000,
  })
  firstParagraph: string;
  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: () => ArticleStatus.ENABLE,
  })
  status: ArticleStatus;

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

  @Column({
    name: 'delete_at',
    type: 'timestamptz',
    nullable: true,
  })
  deleteAt: string;
}
