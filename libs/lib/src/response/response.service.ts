import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success<T = any>(data: T, message = 'success', statusCode = 200) {
    return {
      message,
      statusCode,
      data,
    };
  }
  error<T = any>(
    code: HttpStatus,
    message: string | string[] = 'error',
    data: T | null = null,
  ) {
    return new HttpException(
      {
        message,
        statusCode: code,
        data,
      },
      code,
    );
  }
}
