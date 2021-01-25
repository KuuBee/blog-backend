import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GlobalType } from './interface';
import fs from 'fs';
import path from 'path';

@Injectable()
export class LibService {
  constructor(private _configService: ConfigService) {}
  get isDev(): boolean {
    return this._configService.get<string>('ENVIRONMENT') === 'dev';
  }
  get isProd() {
    return !this.isDev;
  }

  uploadFile({
    file,
    savePath,
    fileName,
  }: {
    file: GlobalType.UploadFile;
    savePath: string;
    // 不需要加后缀
    fileName?: string;
  }): Promise<string> {
    let writePath: string;
    const originName = file.originalname;
    const customFileName = fileName
      ? fileName + originName.match(/\.[\w]*$/i)[0]
      : originName;
    if (this.isDev) {
      writePath = path.normalize(
        `${__dirname}../../../../static/images/avatar/${customFileName}`,
      );
    } else {
      writePath = `${savePath}/${customFileName}`;
    }
    const writeStream = fs.createWriteStream(writePath);
    const resPromise = new Promise<string>((reslove, rejecet) => {
      writeStream.write(file.buffer, (err) => {
        if (err) {
          console.log('error:', err);
          rejecet(err);
        } else {
          reslove(writePath);
        }
      });
    });
    return resPromise;
  }
}
