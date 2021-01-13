import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class DateService {
  now(format = 'YYYY-MM-DD HH:mm:ss') {
    return dayjs().format(format);
  }
}
