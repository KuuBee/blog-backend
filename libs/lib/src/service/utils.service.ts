import { Injectable } from '@nestjs/common';
import { PropertyName } from 'lodash';
import omit from 'lodash/omit';

@Injectable()
export class UtilsService {
  omit<T extends { [key: string]: any }, K extends keyof T>(
    // PropertyName[]
    object: T | null | undefined,
    ...paths: K[]
  ) {
    return omit(object, ...paths);
  }
}
