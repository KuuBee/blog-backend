import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class DateService {
  now(format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs().format(format);
  }
  static now(format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs().format(format);
  }
  static format(date: Date, format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs(date).format(format);
  }
}
