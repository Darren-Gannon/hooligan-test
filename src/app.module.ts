import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GQLDate } from './graphql/scaler/GQLDate';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { CurrentDatePubSub } from './current-date-pub-sub/current-date-pub-sub';
import { VideoModule } from './video/video.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video/entities/video.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { WatchModule } from './watch/watch.module';
import { Watch } from './watch/entities/watch.entity';
import { WATCH_LIMIT } from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        WATCH_LIMIT: Joi.number().default(3)
      }),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      playground: true,
      debug: true,
      autoSchemaFile: true,
      sortSchema: true,
      context: ({ req }) => ({ req })
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ':memory:',
      logging: true,
      synchronize: true,
      entities: [
        Video,
        Watch,
      ]
    }),
    VideoModule,
    WatchModule.forRootAsync(WatchModule, { 
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        watchLimit: configService.get<number>(WATCH_LIMIT)
      })
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    AppResolver,
    CurrentDatePubSub,
    GQLDate,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
