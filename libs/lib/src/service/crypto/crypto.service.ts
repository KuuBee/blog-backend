/*
 * @Descripttion: 加密服务
 * @Author: 杨湛杰
 * @Date: 2021-01-26 11:46:32
 * @LastEditors: 杨湛杰
 * @LastEditTime: 2021-01-27 15:31:54
 */
import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import fs from 'fs';
import NodeRSA from 'node-rsa';

export namespace CryptoServiceType {
  export interface SecretKey {
    key: string;
    iv: string;
  }
}

@Injectable()
export class CryptoService {
  // 公钥文件
  private get _publicKeyStr() {
    return fs.readFileSync(
      '/Users/kuubee/Desktop/test-demo/shell/rsa_public_key.pem',
    );
  }
  // 私钥文件
  private get _privateKeyStr() {
    return fs.readFileSync(
      '/Users/kuubee/Desktop/test-demo/shell/pkcs8_rsa_private_key.pem',
    );
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
