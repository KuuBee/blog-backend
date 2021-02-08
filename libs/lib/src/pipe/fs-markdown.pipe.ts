/*
 * @Descripttion: fs 模块下的 markdown 文件处理流
 * @Author: KuuBee
 * @Date: 2021-02-08 14:58:47
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-08 15:04:55
 */

import { Transform, TransformOptions } from 'stream';

// markdown 图片地址处理
export class ImageUrlTransformPipe extends Transform {
  constructor(private _baseUrl: string, opts?: TransformOptions) {
    super(opts);
  }
  _transform(chunk, encoding, callback) {
    let res: string;
    if (chunk instanceof Buffer) {
      res = chunk.toString('utf-8');
    } else {
      const buffer = Buffer.from(chunk, encoding);
      res = buffer.toString('utf-8');
    }
    const findArr = res.match(/(?<=\]\().*(?=\))/g);
    if (!findArr.length) {
      this.push(res, 'utf-8');
      return callback();
    }
    Array.from(
      new Set(findArr.filter((item) => !item.includes('http'))),
    ).forEach((item) => {
      res = res.replace(
        item,
        `${this._baseUrl}${
          item.match(/((?<=\/)[A-Za-z0-9\u4e00-\u9fa5]*\.jpg|png|jpge)/)[0]
        }`,
      );
    });
    this.push(res, 'utf-8');
    callback();
  }
}
