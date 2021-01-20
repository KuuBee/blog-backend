import path from 'path';
import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LibModule } from '@app/lib';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    LibModule,
    AuthModule,
    UserModule,
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'blog',
    //   // entities: [User],
    //   // synchronize: true,
    //   autoLoadEntities: true,
    // }),
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
  ],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
