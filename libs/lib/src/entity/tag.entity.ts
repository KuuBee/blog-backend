/*
 * @Descripttion: tag 实体
 * @Author: 杨湛杰
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-15 16:51:17
 */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateService } from '@app/lib/date/date.service';

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
    default: () => TagStatus.ENABLE,
  })
  status: TagStatus;

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
