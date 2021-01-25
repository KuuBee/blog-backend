/*
 * @Descripttion: classification 实体
 * @Author: 杨湛杰
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: 杨湛杰
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
export class ClassificationEntity {
  @PrimaryGeneratedColumn({
    name: 'classification_id',
    type: 'int',
  })
  classificationId: number;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: ClassificationStatus,
    default: () => ClassificationStatus.ENABLE,
  })
  status: ClassificationStatus;

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
