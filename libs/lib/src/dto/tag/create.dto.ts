/*
 * @Descripttion: tag 创建DTO
 * @Author: KuuBee
 * @Date: 2021-02-05 10:32:41
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-05 10:42:03
 */

import { TagStatus } from '@app/lib/entity/tag.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateTagDTO {
  @ApiProperty({
    name: 'tag名称',
    example: 'testTagName',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({
    name: 'tag状态',
    example: 'enable',
  })
  @IsNotEmpty()
  @IsEnum(TagStatus)
  status: TagStatus;
}
