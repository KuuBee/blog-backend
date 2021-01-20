import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import path from 'path';

@Injectable()
export class WebService {
  constructor(private _configService: ConfigService) {}
  getHello(): string {
    console.log(path.normalize(__dirname + '../../../../.dev.env'));

    return this._configService.get<string>('NAME') + ' 111';
  }
}
