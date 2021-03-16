/*
 * @Descripttion: web-push 这个功能暂时腰斩 兼容性太差
 * @Author: KuuBee
 * @Date: 2021-03-15 15:47:14
 * @LastEditors: KuuBee
 * @LastEditTime: 2021-03-15 17:01:08
 */
import { Injectable } from '@nestjs/common';
import { setVapidDetails, sendNotification } from 'web-push';
const vapidKeys = {
  publicKey:
    'BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo',
  privateKey: 'PkVHOUKgY29NM7myQXXoGbp_bH_9j-cxW5cO-fGcSsA',
};
const notificationPayload = {
  notification: {
    title: 'Angular News',
    body: 'Newsletter Available!',
    icon: 'assets/main-page-logo-small-hat.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: 'explore',
        title: 'Go to the site',
      },
    ],
  },
};
@Injectable()
export class PushService {
  constructor() {
    setVapidDetails(
      'mailto: contact@my-site.com',
      vapidKeys.publicKey,
      vapidKeys.privateKey,
    );
  }
  send(sub) {
    sendNotification(sub, JSON.stringify(notificationPayload))
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('e', e);
      });
  }
}
