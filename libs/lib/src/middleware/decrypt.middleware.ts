import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DecryptMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(2222);
    next();
  }
}
