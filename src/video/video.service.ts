import { Injectable } from '@nestjs/common';
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

  create(createVideoInput: CreateVideoInput, user: User): Promise<Video> {
    return this.videoRepo.save({
      ...createVideoInput,
      authorId: user.id,
    });
  }

  findAll(user: User): Promise<Video[]> {
    return this.videoRepo.find();
  }

  findOne(id: string, user: User): Promise<Video> {
    return this.videoRepo.findOneOrFail(id);
  }

  async update(id: string, updateVideoInput: UpdateVideoInput, user: User): Promise<Video> {
    const original: Video = await this.findOne(id, user);

    return this.videoRepo.save({
      ...original,
      ...updateVideoInput,
    });
  }

  async remove(id: string, user: User): Promise<Video> {
    const original: Video = await this.findOne(id, user);

    return this.videoRepo.remove(original);
  }
}
