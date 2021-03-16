/*
 * @Descripttion: 邮件服务
 * @Author: KuuBee
 * @Date: 2021-03-15 17:39:03
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-15 18:19:10
 */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { EnvService } from '../env/env.service';
type EmailContentType = Pick<Mail.Options, 'html' | 'subject' | 'to'>;

@Injectable()
export class EmailService {
  constructor(private _env: EnvService) {
    this.transport = nodemailer.createTransport({
      service: 'qq',
      port: 465,
      auth: {
        user: this._env.get('ROOT_EMAIL'),
        pass: this._env.get('SMTP_CODE'),
      },
    });
  }
  transport: nodemailer.Transporter;
  async send(data: EmailContentType) {
    await this.transport.sendMail(this.generateEmailContent(data));
  }
  async sendTest() {
    // const;
  }
  generateEmailContent({ html, subject, to }: EmailContentType): Mail.Options {
    return {
      // 发件人 邮箱
      from: {
        name: this._env.get('ROOT_EMAIL_USER_NAME'),
        address: this._env.get('ROOT_EMAIL'),
      },
      // 主题
      subject,
      // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
      to,
      //这里可以添加html标签
      html,
    };
  }
}
