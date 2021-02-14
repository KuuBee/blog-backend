import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface SuccessType<T = any> {
  data?: T;
  message?: string;
  statusCode?: number;
}
export interface ErrorType<T = any> {
  code?: HttpStatus;
  message?: string | string[];
  data?: T;
}
@Injectable()
export class ResponseService {
  success<T = any>(
    { data, message, statusCode }: SuccessType<T> = { data: null },
  ): Required<SuccessType<T>> {
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
  error(
    { code, message, data }: ErrorType = {
      code: HttpStatus.BAD_REQUEST,
      message: 'error',
      data: null,
    },
  ) {
    throw new HttpException(
      {
        message: message ?? 'error',
        statusCode: code ?? HttpStatus.BAD_REQUEST,
        data: data ?? null,
      },
      code ?? HttpStatus.BAD_REQUEST,
    );
  }
}
