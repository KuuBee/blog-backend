/*
 * @Descripttion: 加密服务
 * @Author: KuuBee
 * @Date: 2021-01-26 11:46:32
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-17 11:30:14
 */
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import fs from 'fs';
import NodeRSA from 'node-rsa';
import { EnvService } from '../env/env.service';

export namespace CryptoServiceType {
  export interface SecretKey {
    key: string;
    iv: string;
  }
}

@Injectable()
export class CryptoService {
  constructor(private _env: EnvService) {}
  // 公钥文件
  private get _publicKeyStr() {
    return fs.readFileSync(this._env.get('RSA_PUBLIC_KEY'));
  }
  // 私钥文件
  private get _privateKeyStr() {
    return fs.readFileSync(this._env.get('PKCS8_RSA_PRIVATE_KEY'));
  }
  // rsa公钥
  private get _rsaPublicKey() {
    return new NodeRSA(this._publicKeyStr, 'public', {
      encryptionScheme: 'pkcs1',
    });
  }
  // rsa私钥
  private get _rsaPrivateKey() {
    return new NodeRSA(this._privateKeyStr, 'pkcs8', {
      encryptionScheme: 'pkcs1',
    });
  }
  aesEncrypto(data: string, key: string, iv: string) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    return cipher.update(data, 'utf8', 'base64') + cipher.final('base64');
  }
  aesDecrypto(code: string, key: string, iv: string): string {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    return decipher.update(code, 'base64', 'utf8') + decipher.final('utf8');
  }

  rsaEncrypto() {
    //
  }
  /**
   * @description: rsa解密
   * @param {string} code 密文
   * @return {string} 明文
   */
  rsaDecrypto(code: string): string {
    try {
      return this._rsaPrivateKey.decrypt(code, 'utf8');
    } catch (error) {
      console.log(error);
      throw new Error('rsa解密异常');
    }
  }
}
