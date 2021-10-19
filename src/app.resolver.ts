import { Resolver, Query } from '@nestjs/graphql';
import { AppService } from './app.service';
import { GQLDate } from './graphql/scaler/GQLDate';

@Resolver()
export class AppResolver {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Query(returns => GQLDate)
  getDate(): Date {
    return this.appService.getDate();
  }
}
