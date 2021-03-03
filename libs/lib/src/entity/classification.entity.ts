/*
 * @Descripttion: classification 实体
 * @Author: KuuBee
 * @Date: 2021-01-15 16:12:57
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-14 22:18:05
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
    type: 'int4',
    default: '0',
  })
  count: number;

  @Column({
    type: 'enum',
    enumName: 'classification_status',
    enum: ClassificationStatus,
    default: ClassificationStatus.ENABLE,
  })
  status: ClassificationStatus;

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
}
