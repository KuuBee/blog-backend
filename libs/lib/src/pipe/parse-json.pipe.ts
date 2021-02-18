/*
 * @Descripttion: 解析nest json 路由参数管道
 * @Author: KuuBee
 * @Date: 2021-02-18 14:04:52
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-18 14:07:44
 */

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseJsonPipe<T = any> implements PipeTransform<T, any> {
  constructor(private _selectKey: (keyof T)[]) {}
  transform(value: T, metadata: ArgumentMetadata): any {
    try {
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          const element = value[key];
          if (this._selectKey.includes(key)) {
            value[key] = JSON.parse((element as any) as string);
          }
        }
      }
    } catch (error) {
      throw new BadRequestException({
        message: 'JSON格式异常',
        error,
      });
    }
    return value;
  }
}
