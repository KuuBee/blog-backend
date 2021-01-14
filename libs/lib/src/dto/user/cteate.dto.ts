/*
 * @Descripttion: 创建用户
 * @Author: 杨湛杰
 * @Date: 2021-01-13 16:53:42
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-14 09:55:00
 */
import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@app/lib/entity/user.entity';
import { IsOptional, IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    name: '名称',
    example: 'test',
  })
  @IsNotEmpty()
  @IsString()
  name!: string;

  @ApiProperty({
    name: '头像',
    example: 'baidu.com',
    nullable: false,
  })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({
    name: '密码',
    example: '******',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    name: '邮箱',
    example: '123@qq.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;
}
