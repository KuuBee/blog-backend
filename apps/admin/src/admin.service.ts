import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }
}
