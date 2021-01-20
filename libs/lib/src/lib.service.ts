import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LibService {
  constructor(private _configService: ConfigService) {}
  get isDev(): boolean {
    return this._configService.get<string>('ENVIRONMENT') === 'dev';
  }
  isProd() {
    return !this.isDev;
  }
}
