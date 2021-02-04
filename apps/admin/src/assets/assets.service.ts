import { ResponseService } from '@app/lib/service/response.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AssetsService {
  constructor(private _responseService: ResponseService) {}
  menu() {
    // TODO 返回管理端 侧边栏 暂时采用硬编码 之后需要更新至json文件内
    return this._responseService.success({
      data: {
        menu: [
          {
            route: 'dashboard',
            name: 'dashboard',
            type: 'link',
            icon: 'dashboard',
            badge: {
              color: 'red-500',
              value: '5',
            },
          },
          {
            route: 'article',
            name: 'article',
            type: 'sub',
            icon: 'insert_drive_file',
            children: [
              {
                route: 'index',
                name: 'index',
                type: 'link',
              },
            ],
          },
          {
            route: 'user',
            name: 'user',
            type: 'sub',
            icon: 'supervisor_account',
            children: [
              {
                route: 'index',
                name: 'index',
                type: 'link',
              },
            ],
          },
          {
            route: 'sessions',
            name: 'sessions',
            type: 'sub',
            icon: 'question_answer',
            children: [
              {
                route: '403',
                name: '403',
                type: 'link',
              },
              {
                route: '404',
                name: '404',
                type: 'link',
              },
              {
                route: '500',
                name: '500',
                type: 'link',
              },
            ],
          },
        ],
      },
    });
  }
  i18n(type: string) {
    console.log(type);

    return {};
  }
}
