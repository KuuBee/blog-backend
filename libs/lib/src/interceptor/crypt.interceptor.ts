import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, of, throwError } from 'rxjs';
import { tap, concatMap, catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import {
  CryptoService,
  CryptoServiceType,
} from '../service/crypto/crypto.service';
import { GlobalType } from '../interface';
import FormData from 'form-data';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseService } from '../service/response.service';

// FileInterceptor('file').

@Injectable()
export class CryptInterceptor implements NestInterceptor {
  constructor(
    private _cryptoService: CryptoService,
    private _responseService: ResponseService,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();

    const { key, iv } = JSON.parse(
      this._cryptoService.rsaDecrypto(req.headers['secret-key'] as string),
    ) as CryptoServiceType.SecretKey;
    // 解密
    this._decryptRequest(req, key, iv);

    return next.handle().pipe(
      concatMap((val) => {
        console.log('返回值', val);
        // 如果返回值为文件则不进行加密
        if (val instanceof Buffer) {
          return of(val);
        } else {
          if (val instanceof HttpException) {
            return throwError(val);
          } else {
            // 使用解密的key和iv对返回值进行加密
            const res = this._cryptoService.aesEncrypto(
              JSON.stringify(val),
              key,
              iv,
            );
            return of(res);
          }
        }
      }),
      catchError((err) => {
        if (err instanceof HttpException) {
          throw err;
        }
        console.log(err);
        throw err;
      }),
    );
  }

  /**
   * @description: 解密请求数据
   * @param {Request} req
   * @return {*}
   */
  private _decryptRequest(req: Request, key: string, iv: string) {
    console.log('拦截器----------------请求解密开始');
    const body: GlobalType.StrKeyObj = req.body;
    const query = req.query;

    // 解密 query
    if (Object.keys(query).length) {
      for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
          const element = query[key];
          // query decodeURIComponent 解密
          query[key] = decodeURIComponent(element.toString());
        }
      }
      req.query = this._decryptObj(query, key, iv);
      console.log('query 解密完成:', req.query);
    }
    // 解密 body
    if (Object.keys(body).length) {
      req.body = this._decryptObj(body, key, iv);
      console.log('body 解密完成:', req.body);
    }
    console.log('中间件----------------请求解密结束');
  }

  private _decryptObj(
    data: GlobalType.StrKeyObj,
    key: string,
    iv: string,
  ): GlobalType.StrKeyObj {
    const decryptObj = {};
    if (Object.keys(data).length) {
      for (const dataKey in data) {
        if (Object.prototype.hasOwnProperty.call(data, dataKey)) {
          const element = data[dataKey];
          const decryptRes = this._cryptoService.aesDecrypto(element, key, iv);
          Object.assign(decryptObj, JSON.parse(decryptRes));
        }
      }
      return decryptObj;
    }
    return {};
  }
}
