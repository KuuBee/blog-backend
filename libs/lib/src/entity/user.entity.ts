/*
 * @Descripttion: user 实体
 * @Author: KuuBee
 * @Date: 2021-01-13 09:55:21
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 17:22:44
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';
import { ReplyEntity } from './reply.entity';
import { CommentEntity } from './comment.entity';
import { FriendLinkEntity } from './friend-link.entity';

export enum UserStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
    type: 'int',
  })
  userId: number;

  @Column()
  name: string;

  @Column()
  avatar: string;

  @Column({
    // 禁止默认select
    select: false,
  })
  password: string;

  @Column()
  email: string;

  @Column({
    default: '10',
  })
  level: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ENABLE,
  })
  status: UserStatus;

  @Column({
    name: 'link_id',
    type: 'int',
    nullable: true,
  })
  linkId: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    transformer: DateService.transformer(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    transformer: DateService.transformer(),
  })
  updatedAt: Date;

  // 关系部分
  @OneToMany(() => ReplyEntity, (reply) => reply.user)
  reply: ReplyEntity[];
  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comment: CommentEntity[];
  @OneToOne(() => FriendLinkEntity, (fl) => fl.user)
  friendLink: FriendLinkEntity;
}
