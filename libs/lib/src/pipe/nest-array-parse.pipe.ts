/*
 * @Descripttion: json Array 转换
 * @Author: KuuBee
 * @Date: 2021-02-18 13:53:49
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-18 13:56:50
 */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ArrayParsePipe<T = any> implements PipeTransform<T, any> {
  constructor(private _selectKey: (keyof T)[]) {}
  transform(value: T, metadata: ArgumentMetadata): any {
    console.log(value);
    console.log(metadata);
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        if (this._selectKey.includes(key)) {
          value[key] = JSON.parse((element as any) as string);
        }
      }
    }
    return value;
  }
}
