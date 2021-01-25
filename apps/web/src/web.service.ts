import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodeRSA from 'node-rsa';
import fsPromises from 'fs/promises';

@Injectable()
export class WebService {
  constructor(private _configService: ConfigService) {}
  async getHello() {
    const text = 'Hello RSA!';
    const publicKeyStr = await fsPromises.readFile(
      '/Users/kuubee/Desktop/test-demo/shell/rsa_public_key.pem',
    );
    const privateKeyStr = await fsPromises.readFile(
      '/Users/kuubee/Desktop/test-demo/shell/pkcs8_rsa_private_key.pem',
    );
    const publicKey = new NodeRSA(publicKeyStr, 'public');
    const privateKey = new NodeRSA(privateKeyStr, 'pkcs8');
    const encrypted = publicKey.encrypt(text, 'base64');
    const decrypted = privateKey.decrypt(encrypted, 'utf8');
    return {
      env: this._configService.get<string>('NAME') + ' 111',
      encrypted,
      decrypted,
    };
  }
}
