/*
 * @Descripttion: User实体
 * @Author: 杨湛杰
 * @Date: 2021-01-13 09:55:21
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-13 14:29:43
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import dayjs from 'dayjs';

export enum UserStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  user_id?: number;

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

  @Column('int')
  linkId?: number;

  @Column({
    type: 'timestamp',
    default: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  })
  created_at?: string;

  @Column('timestamp')
  updated_at?: string;

  @Column('timestamp')
  delete_at?: string;
}
