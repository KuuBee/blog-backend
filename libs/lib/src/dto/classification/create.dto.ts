/*
 * @Descripttion:分类创建DTO
 * @Author: KuuBee
 * @Date: 2021-02-05 16:04:46
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-05 16:04:46
 */

import { ClassificationStatus } from '@app/lib/entity/classification.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateClassificationDTO {
  @ApiProperty({
    name: '分类名称',
    example: 'testName',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    name: '分类状态',
    example: 'enable',
  })
  @IsNotEmpty()
  @IsEnum(ClassificationStatus)
  status: ClassificationStatus;
}
