import { LibModule } from '@app/lib';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserModule } from './user/user.module';
import { AssetsModule } from './assets/assets.module';
import { TagModule } from './tag/tag.module';
import { ClassificationModule } from './classification/classification.module';
import { ArticleModule } from './article/article.module';
import { SearchModule } from './search/search.module';
import { FriendLinkModule } from './friend-link/friend-link.module';
import { TokenModule } from './token/token.module';
import { CommentModule } from './comment/comment.module';
import { ReplyModule } from './reply/reply.module';

@Module({
  imports: [
    LibModule,
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
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AssetsModule,
    TagModule,
    ClassificationModule,
    ArticleModule,
    SearchModule,
    FriendLinkModule,
    TokenModule,
    CommentModule,
    ReplyModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
