import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { GQLDate } from './graphql/scaler/GQLDate';
import { CurrentDatePubSub } from './current-date-pub-sub/current-date-pub-sub';

@Module({
  imports: [
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
