import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WebModule } from './web.module';

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

  await app.listen(3000);
}
bootstrap();
