import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private _configService: ConfigService) {}
  get isDev(): boolean {
    return this._configService.get('ENVIRONMENT') === 'dev';
  }
  get isPron(): boolean {
    return !this.isDev;
  }
  get<T = string>(key: string) {
    return this._configService.get<T>(key);
  }
}
