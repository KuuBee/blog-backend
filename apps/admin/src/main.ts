import { NestFactory } from '@nestjs/core';
import { AdminModule } from './admin.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AdminModule);
  app.use(helmet());
  app.setGlobalPrefix('/api/admin/blog');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('博客admin端api')
    .setDescription('博客admin端api')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
