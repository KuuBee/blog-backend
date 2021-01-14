import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WebModule } from './web.module';
import { HttpException, ValidationPipe } from '@nestjs/common';

import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言
import { HttpExceptionFilter } from '@app/lib/http-exception.filter';
import { LoggingInterceptor } from '@app/lib/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(WebModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api/blog');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
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
