/*
 * @Descripttion: 实体集合
 * @Author: KuuBee
 * @Date: 2021-02-02 15:55:35
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-02 15:55:36
 */

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user.entity';

export const ALL_ENTITY = [TypeOrmModule.forFeature([UserEntity])];
