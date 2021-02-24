/*
 * @Descripttion: markdown 获取第一段 不会修改原内容
 * @Author: KuuBee
 * @Date: 2021-02-19 13:40:19
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-19 14:39:52
 */
import { Transform } from 'stream';

export class SelectParagraphPipe extends Transform {
  private _firstParagraph = '';
  get firstParagraph() {
    return this._firstParagraph;
  }
  _transform(chunk, encoding, callback) {
    let res: string;
    if (chunk instanceof Buffer) {
      res = chunk.toString('utf-8');
    } else {
      const buffer = Buffer.from(chunk, encoding);
      res = buffer.toString('utf-8');
    }
    if (!this._firstParagraph) {
      const matchRes = res.match(
        /\n[1-9a-zA-Z\u4e00-\u9fa5].*[1-9a-zA-Z\u4e00-\u9fa5]/,
      );
      const matchContent = matchRes[0];
      const matchIndex = matchRes['index'];
      this._firstParagraph = `${res.substring(0, matchIndex)}${matchContent}`;
    }
    this.push(res, 'utf-8');
    callback();
  }
}
