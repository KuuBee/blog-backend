import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WebModule } from './web.module';

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言

async function bootstrap() {
  const app = await NestFactory.create(WebModule);
  app.setGlobalPrefix('/api/blog');

  const options = new DocumentBuilder()
    .setTitle('博客web端api')
    .setDescription('博客web端api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  // dayjs 本地化
  dayjs.extend(isLeapYear); // 使用插件
  dayjs.locale('zh-cn'); // 使用本地化语言

  await app.listen(3000);
}
bootstrap();
