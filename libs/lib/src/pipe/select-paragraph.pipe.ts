/*
 * @Descripttion: markdown 获取第一段 不会修改原内容
 * @Author: KuuBee
 * @Date: 2021-02-19 13:40:19
 * @LastEditors: KuuBee
 * @LastEditTime: 2022-01-06 10:48:30
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
      this._selectFirstParagraph(res);
    }
    this.push(res, 'utf-8');
    callback();
  }
  // 筛选第一段
  private _selectFirstParagraph(text: string) {
    let falg = true;
    while (falg) {
      text = text.replace(/(^.*\n.*)/, (_match, p1) => {
        // 如果当前 p1 内有 #标题 并且 _firstParagraph 内部已经有了标题是 就中断
        if (
          this._firstParagraph.match(/\n#+\s\S*\n/) &&
          p1.match(/\n?#+\s\S*\n?/)
        ) {
          falg = false;
          return '';
        }
        this._firstParagraph += p1;
        return '';
      });
    }
  }
}
