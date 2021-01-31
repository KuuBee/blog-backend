import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodeRSA from 'node-rsa';
import fsPromises from 'fs/promises';
import { ResponseService } from '@app/lib/service/response.service';

@Injectable()
export class WebService {
  constructor(
    private _configService: ConfigService,
    private _responseService: ResponseService,
  ) {}
  async getHello() {
    const text = 'Hello RSA!';
    const publicKeyStr = await fsPromises.readFile(
      '/Users/kuubee/Desktop/test-demo/shell/rsa_public_key.pem',
    );
    const privateKeyStr = await fsPromises.readFile(
      '/Users/kuubee/Desktop/test-demo/shell/pkcs8_rsa_private_key.pem',
    );
    const publicKey = new NodeRSA(publicKeyStr, 'public', {
      encryptionScheme: 'pkcs1',
    });
    const privateKey = new NodeRSA(privateKeyStr, 'pkcs8', {
      encryptionScheme: 'pkcs1',
    });
    const encrypted = publicKey.encrypt(text, 'base64');
    const decrypted = privateKey.decrypt(
      'FJ8JM06wcHwopxn6M6HpwFfEhStp9Xchznr2ORPo+chVyD1TStFZpWv+anc7IETlQdTZ3BNFvHEaBSY0LAFYqett6fpns0Nxy/r3edgRTYU8uRmF7vMHiNmQ5kPZChxVPgvNBf0NzbOZ3G1jXK+EZ7N8Uad/aru07wdXmFua6iI=',
      'utf8',
    );

    return this._responseService.success({
      data: {
        env: this._configService.get<string>('NAME') + ' 111',
        encrypted,
        decrypted,
      },
    });
  }
}
