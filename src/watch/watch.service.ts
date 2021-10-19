import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { User } from 'express';
import { Video } from 'src/video/entities/video.entity';
import { VideoService } from 'src/video/video.service';
import { Connection, Repository } from 'typeorm';
import { WATCH_MODULE_CONFIG } from './constants';
import { CreateWatchInput } from './dto/create-watch.input';
import { Watch } from './entities/watch.entity';
import { WatchModuleConfig } from './watch-module-config';

@Injectable()
export class WatchService {

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectRepository(Watch) private readonly watchRepo: Repository<Watch>,
    private readonly videoService: VideoService,
    @Inject(WATCH_MODULE_CONFIG) private readonly config: WatchModuleConfig,
  ) {}

  create(createWatchInput: CreateWatchInput, user: User): Promise<Watch> {
    return this.connection.transaction(async manager => {
      const watchRepo: Repository<Watch> = manager.getRepository(Watch);

      if(this.config.watchLimit > 0) {
        const count: number = await watchRepo.count({
          where: {
            userId: user.id
          }
        })

        if(count == this.config.watchLimit)
          throw new ForbiddenException(`Watch limit has been reached. Watch count/limit is '${count}/${this.config.watchLimit}'`);

        if(count > this.config.watchLimit)
          throw new ForbiddenException(`Watch limit has been exceeded. Watch count/limit is '${count}/${this.config.watchLimit}'`);
      }
      
      const video: Video = await this.videoService.findOne(createWatchInput.videoId, user);

      const newWatch: Partial<Watch> = {
        userId: user.id,
        video,
      }

      return watchRepo.save(newWatch)
    })
  }

  findAll(user: User): Promise<Watch[]> {
    return this.watchRepo.find({
      where: {
        userId: user.id
      }
    });
  }

  findOne(id: string, user: User): Promise<Watch> {
    return this.watchRepo.findOneOrFail({
      where: {
        userId: user.id,
        id,
      }
    });
  }

  remove(id: string, user: User): Promise<Watch> {
    return this.connection.transaction(async manager => {
      const watchRepo: Repository<Watch> = manager.getRepository(Watch);

      const watch: Watch = await this.findOne(id, user);

      return watchRepo.remove(watch);
    });
  }
}
