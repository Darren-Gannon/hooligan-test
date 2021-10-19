import { Resolver, Query, Subscription } from '@nestjs/graphql';
import { AppService } from './app.service';
import { GQLDate } from './graphql/scaler/GQLDate';
import { PubSub } from 'graphql-subscriptions';
import { Inject } from '@nestjs/common';
import { CURRENT_DATE_PUB_SUB } from './constants';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    @Inject(CURRENT_DATE_PUB_SUB) private pubSub: PubSub,
  ) { }

  @Query(() => GQLDate)
  date(): Date {
    return this.appService.getDate();
  }

  @Subscription(() => GQLDate, {
    resolve: (payload) => payload,
  })
  currentDate() {
    return this.pubSub.asyncIterator(CURRENT_DATE_PUB_SUB);
  }
}
