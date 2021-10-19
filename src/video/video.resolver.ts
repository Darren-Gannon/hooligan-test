import { Resolver, Query, Mutation, Args, ID, GqlExecutionContext, Context } from '@nestjs/graphql';
import { VideoService } from './video.service';
import { Video } from './entities/video.entity';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Request } from 'express';

@Resolver(() => Video)
export class VideoResolver {
  constructor(
    private readonly videoService: VideoService,
  ) {}

  @Mutation(() => Video)
  createVideo(
    @Args('createVideoInput') createVideoInput: CreateVideoInput,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.videoService.create(createVideoInput, req.user);
  }

  @Query(() => [Video], { name: 'videos' })
  findAll(
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.videoService.findAll(req.user);
  }

  @Query(() => Video, { name: 'video' })
  findOne(
    @Args('id', { type: () => ID }) id: string,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.videoService.findOne(id, req.user);
  }

  @Mutation(() => Video)
  updateVideo(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateVideoInput') updateVideoInput: UpdateVideoInput,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.videoService.update(id, updateVideoInput, req.user);
  }

  @Mutation(() => Video)
  removeVideo(
    @Args('id', { type: () => ID }) id: string,
    @Context() context: GqlExecutionContext,
  ) {
    const req: Request = context.getArgs().req;
    return this.videoService.remove(id, req.user);
  }
}
