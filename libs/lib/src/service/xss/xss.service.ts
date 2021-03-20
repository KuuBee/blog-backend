import { Injectable } from '@nestjs/common';
import { filterXSS, IFilterXSSOptions } from 'xss';

// make love,no xss!
@Injectable()
export class XssService {
  filterXSS(html: string, options?: IFilterXSSOptions) {
    return filterXSS(html, options);
  }
}
