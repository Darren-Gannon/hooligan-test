import { Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'express';
import { Repository } from 'typeorm';
import { CreateVideoInput } from './dto/create-video.input';
import { UpdateVideoInput } from './dto/update-video.input';
import { Video } from './entities/video.entity';

@Injectable()
export class VideoService {

  constructor(
    @InjectRepository(Video) private readonly videoRepo: Repository<Video>,
  ) { }

  private readonly logger: Logger = new Logger(VideoService.name);

  create(createVideoInput: CreateVideoInput, user: User): Promise<Video> {
    return this.videoRepo.save({
      ...createVideoInput,
      authorId: user.id,
    }).catch(err => {
      this.logger.error(err);
      throw new InternalServerErrorException();
    });
  }

  findAll(user: User): Promise<Video[]> {
    return this.videoRepo.find();
  }

  findOne(id: string, user: User): Promise<Video> {
    return this.videoRepo.findOneOrFail(id).catch(err => { throw new NotFoundException() });
  }

  async update(id: string, updateVideoInput: UpdateVideoInput, user: User): Promise<Video> {
    const original: Video = await this.findOne(id, user);

    return this.videoRepo.save({
      ...original,
      ...updateVideoInput,
    }).catch(err => {
      this.logger.error(err);
      throw new InternalServerErrorException();
    });
  }

  async remove(id: string, user: User): Promise<Video> {
    const original: Video = await this.findOne(id, user);

    return this.videoRepo.remove(original).catch(err => {
      this.logger.error(err);
      throw new InternalServerErrorException();
    });
  }
}
