/*
 * @Descripttion: user 实体
 * @Author: KuuBee
 * @Date: 2021-01-13 09:55:21
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-02 15:10:36
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/service/date.service';

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

  @Column()
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
}
