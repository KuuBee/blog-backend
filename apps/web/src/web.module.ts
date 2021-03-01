import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LibModule } from '@app/lib';
import { ConfigService } from '@nestjs/config';
import { DecryptMiddleware } from '@app/lib/middleware/decrypt.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CryptInterceptor } from '@app/lib/interceptor/crypt.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleModule } from './article/article.module';
import { SearchModule } from './search/search.module';
import { TagModule } from './tag/tag.module';
import { ClassificationModule } from './classification/classification.module';
import { FriendLinkModule } from './friend-link/friend-link.module';

@Module({
  imports: [
    LibModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [LibModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('HOST'),
        port: parseInt(configService.get<string>('PORT')),
        username: configService.get<string>('NAME'),
        password: configService.get<string>('PASSWROD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ArticleModule,
    SearchModule,
    TagModule,
    ClassificationModule,
    FriendLinkModule,
  ],
  controllers: [WebController],
  providers: [
    WebService,
    {
      provide: APP_INTERCEPTOR,
      useClass: FileInterceptor('file', {
        limits: {
          fieldSize: 150,
        },
      }),
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CryptInterceptor,
    },
  ],
})
export class WebModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecryptMiddleware).forRoutes('*');
  }
}
