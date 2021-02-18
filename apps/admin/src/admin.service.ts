import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';

@Injectable()
export class AdminService {
  getHello(): string {
    const res = execSync('pwd', {
      encoding: 'utf-8',
    });
    return res;
    return 'Hello World!';
  }
}
