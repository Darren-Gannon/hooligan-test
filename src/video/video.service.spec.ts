import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'express';
import { Video } from './entities/video.entity';
import { VideoService } from './video.service';

describe('VideoService', () => {
  const defaultUser: User = {
    id: 'default'
  };

  describe('basic test', () => {
    let service: VideoService;

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

  });

  describe('create video', () => {
    let service: VideoService;

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

  describe('update video', () => {
    let service: VideoService;

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

    it('should update a video', () => {
      service.update('1', {
        duration: 1,
        name: ''
      }, defaultUser).then(video => {
        expect(video).toBeDefined()
        expect(video.name).toBe('')
        expect(video.duration).toBe(1)
      })
    })
  });
});
