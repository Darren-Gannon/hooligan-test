import { Resolver, Query, Mutation, Args, ID, Context, GqlExecutionContext } from '@nestjs/graphql';
import { WatchService } from './watch.service';
import { Watch } from './entities/watch.entity';
import { CreateWatchInput } from './dto/create-watch.input';
import { Request } from 'express';

@Resolver(() => Watch)
export class WatchResolver {
  constructor(private readonly watchService: WatchService) { }

  @Mutation(() => Watch, { name: 'watch' })
  createWatch(
    @Args('createWatchInput') createWatchInput: CreateWatchInput,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.watchService.create(createWatchInput, req.user);
  }

  @Query(() => [Watch], { name: 'whatAmIWatching' })
  findAll(
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.watchService.findAll(req.user);
  }

  @Query(() => Watch, { name: 'amIWatching' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.watchService.findOne(id, req.user);
  }

  @Mutation(() => Watch, { name: 'stopWatching' })
  removeWatch(
    @Args('id', { type: () => ID }) id: string,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.watchService.remove(id, req.user);
  }
}
