import { Resolver, Query, Subscription } from '@nestjs/graphql';
import { AppService } from './app.service';
import { GQLDate } from './graphql/scaler/GQLDate';
import { CURRENT_DATE_PUB_SUB } from './constants';
import { CurrentDatePubSub } from './current-date-pub-sub/current-date-pub-sub';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
    private readonly currentDatePubSub: CurrentDatePubSub,
  ) { }

  @Query(() => GQLDate)
  date(): Date {
    return this.appService.getDate();
  }

  @Subscription(() => GQLDate, {
    resolve: (payload) => payload,
  })
  currentDate() {
    return this.currentDatePubSub.asyncIterator(CURRENT_DATE_PUB_SUB);
  }
}
