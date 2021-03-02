/*
 * @Descripttion: 实体集合
 * @Author: KuuBee
 * @Date: 2021-02-02 15:55:35
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 15:19:17
 */

import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { ClassificationEntity } from '../entity/classification.entity';
// import { CommentEntity } from '../entity/comment.entity';
import { FriendLinkEntity } from '../entity/friend-link.entity';
import { TagEntity } from '../entity/tag.entity';
import { UserEntity } from '../entity/user.entity';

export const ALL_ENTITY = [
  TypeOrmModule.forFeature([UserEntity]),
  TypeOrmModule.forFeature([TagEntity]),
  TypeOrmModule.forFeature([ArticleEntity]),
  TypeOrmModule.forFeature([UserEntity]),
  TypeOrmModule.forFeature([ClassificationEntity]),
  // TypeOrmModule.forFeature([CommentEntity]),
  TypeOrmModule.forFeature([FriendLinkEntity]),
];
