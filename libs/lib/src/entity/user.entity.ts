/*
 * @Descripttion: User实体
 * @Author: 杨湛杰
 * @Date: 2021-01-13 09:55:21
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-14 14:00:50
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  userId?: number;

  @Column()
  name!: string;

  @Column()
  avatar?: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  @Column({
    default: 10,
  })
  level?: number;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ENABLE,
  })
  status?: UserStatus;

  @Column({
    name: 'link_id',
    type: 'int',
  })
  linkId?: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
  })
  updatedAt?: string;

  @Column({
    name: 'delete_at',
    type: 'timestamptz',
  })
  deleteAt?: string;
}
