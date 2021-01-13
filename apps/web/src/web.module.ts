import { Module } from '@nestjs/common';
import { WebController } from './web.controller';
import { WebService } from './web.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { LibModule } from '@app/lib';

@Module({
  imports: [
    LibModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'blog',
      // entities: [User],
      // synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
  ],
  controllers: [WebController],
  providers: [WebService],
})
export class WebModule {}
