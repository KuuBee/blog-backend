import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export interface SuccessType<T> {
  data: T;
  message?: string;
  statusCode?: number;
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
  error<T = any>({
    code,
    message,
    data,
  }: {
    code: HttpStatus;
    message?: string | string[];
    data?: T;
  }) {
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
