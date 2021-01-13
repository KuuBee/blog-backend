import { Injectable } from '@nestjs/common';

@Injectable()
export class LibService {
  a = 1;
  log() {
    this.a += 1;
    console.log(this.a);
  }
}
