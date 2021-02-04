/*
 * @Descripttion: 一些全局的interface
 * @Author: KuuBee
 * @Date: 2021-01-19 14:39:19
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-01-19 14:44:14
 */
export namespace GlobalType {
  export interface UploadFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    buffer: Buffer;
    mimetype: string;
    size: number;
  }
  export interface StrKeyObj {
    [key: string]: any;
  }
}
