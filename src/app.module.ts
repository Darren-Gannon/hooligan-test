import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GQLDate } from './graphql/scaler/GQLDate';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CurrentDatePubSub } from './current-date-pub-sub/current-date-pub-sub';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        VIDEO_LIMIT: Joi.number().default(3)
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
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    AppResolver,
    CurrentDatePubSub,
    GQLDate,
  ],
})
export class AppModule {}
