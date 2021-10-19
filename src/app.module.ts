import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { PubSub } from 'graphql-subscriptions';
import { CURRENT_DATE_PUB_SUB } from './constants';
import { GQLDate } from './graphql/scaler/GQLDate';

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
    {
      provide: CURRENT_DATE_PUB_SUB,
      useFactory: () => {
        const pubSub: PubSub = new PubSub()
        
        setInterval(() => {
          pubSub.publish(CURRENT_DATE_PUB_SUB, new Date())
        }, 1000);

        return pubSub;
      },
    },
    GQLDate,
  ],
})
export class AppModule {}
