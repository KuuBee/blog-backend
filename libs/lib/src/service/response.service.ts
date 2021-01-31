import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface SuccessType<T = any> {
  data: T;
  message?: string;
  statusCode?: number;
}
export interface ErrorType<T = any> {
  code: HttpStatus;
  message?: string | string[];
  data?: T;
}
@Injectable()
export class ResponseService {
  success<T = any>({
    data,
    message,
    statusCode,
  }: SuccessType<T>): Required<SuccessType<T>> {
    return {
      statusCode: statusCode ?? 200,
      message: message ?? 'success',
      data,
    };
  }

  /**
   * @description: 发送错误信息
   * @param {ErrorType} data 错误信息
   * @return {HttpException}
   */
  error<T = any>({ code, message, data }: ErrorType) {
    return new HttpException(
      {
        message: message ?? 'error',
        statusCode: code,
        data: data ?? null,
      },
      code,
    );
  }
}
