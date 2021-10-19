import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'express';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

describe('VideoService', () => {
  let service: VideoService;
  const defaultUser: User = {
    id: 'default'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        {
          provide: getRepositoryToken(Video),
          useValue: {
            save: async (video) => video
          }
        }
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a video', () => {
    service.create({
      duration: 1,
      name: ''
    }, defaultUser).then(video => {
      expect(video).toBeDefined()
      expect(video.name).toBe('')
      expect(video.duration).toBe(1)
    })
  })
});
