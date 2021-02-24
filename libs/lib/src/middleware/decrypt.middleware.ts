/*
 * @Descripttion: 解密中间件
 * @Author: KuuBee
 * @Date: 2021-01-25 11:06:12
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-02-20 11:46:21
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { GlobalType } from '../interface';
import {
  CryptoService,
  CryptoServiceType,
} from '../service/crypto/crypto.service';

@Injectable()
export class DecryptMiddleware implements NestMiddleware {
  constructor(private _cryptoService: CryptoService) {}
  use(req: Request, res: Response, next: () => void) {
    // 不考虑 params 穿参

    // console.log('中间件----------------解密开始');
    // // console.log('secret-key', req.headers['secret-key']);
    // // 解密完成的 aesKey
    // const { key, iv } = JSON.parse(
    //   this._cryptoService.rsaDecrypto(req.headers['secret-key'] as string),
    // ) as CryptoServiceType.SecretKey;

    // const body: GlobalType.StrKeyObj = req.body;
    // if (Object.keys(body).length) {
    //   for (const bodyKey in body) {
    //     if (Object.prototype.hasOwnProperty.call(body, bodyKey)) {
    //       const element = body[bodyKey];
    //       // console.log('element', element);
    //       const resD = this._cryptoService.aesDecrypto(element, key, iv);
    //       console.log('resD:', resD);
    //     }
    //   }
    // }

    // // req.query = { query: 'query已修改' };
    // // req.body = { body: 'body已修改' };
    // // console.log('query:', req.query);
    // // console.log('body:', req.body);
    // console.log('中间件----------------解密结束');

    next();
  }
}
