import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

describe('VideoController', () => {

  describe('Basic Test', () => {
    let controller: VideoController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [VideoController],
        providers: [
          {
            provide: VideoService,
            useValue: {}
          }
        ]
      }).compile();

      controller = module.get<VideoController>(VideoController);
    });

    it('should be defined', () => {
      expect(controller).toBeDefined();
    });
  })

  describe('Create video Test', () => {
    let controller: VideoController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [VideoController],
        providers: [
          {
            provide: VideoService,
            useValue: {
              create: async (video) => video
            }
          }
        ]
      }).compile();

      controller = module.get<VideoController>(VideoController);
    });

    it('should create a video', () => {
      const req: Request = {
        headers: {
          authorization: '1'
        },
        user: {
          id: '1'
        }
      };
      expect(controller.createVideo({ name: '', duration: 0 }, req)).toBeDefined();
    });
  })

  describe('Remove video Test', () => {
    let controller: VideoController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [VideoController],
        providers: [
          {
            provide: VideoService,
            useValue: {
              remove: async (video) => video
            }
          }
        ]
      }).compile();

      controller = module.get<VideoController>(VideoController);
    });

    it('should create a video', () => {
      const req: Request = {
        headers: {
          authorization: '1'
        },
        user: {
          id: '1'
        }
      };
      expect(controller.removeVideo('1', req)).toBeDefined();
    });
  })

  describe('Update video Test', () => {
    let controller: VideoController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [VideoController],
        providers: [
          {
            provide: VideoService,
            useValue: {
              update: async (video) => video
            }
          }
        ]
      }).compile();

      controller = module.get<VideoController>(VideoController);
    });

    it('should create a video', () => {
      const req: Request = {
        headers: {
          authorization: '1'
        },
        user: {
          id: '1'
        }
      };
      expect(controller.updateVideo('1', { name: '', duration: 0 }, req)).toBeDefined();
    });
  })

  describe('Find all video Test', () => {
    let controller: VideoController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [VideoController],
        providers: [
          {
            provide: VideoService,
            useValue: {
              findAll: async () => []
            }
          }
        ]
      }).compile();

      controller = module.get<VideoController>(VideoController);
    });

    it('should find all videos', () => {
      const req: Request = {
        headers: {
          authorization: '1'
        },
        user: {
          id: '1'
        }
      };
      expect(controller.findAll(req)).toBeDefined();
    });
  })

  describe('Find a video Test', () => {
    let controller: VideoController;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [VideoController],
        providers: [
          {
            provide: VideoService,
            useValue: {
              findOne: async () => {}
            }
          }
        ]
      }).compile();

      controller = module.get<VideoController>(VideoController);
    });

    it('should find a videos', () => {
      const req: Request = {
        headers: {
          authorization: '1'
        },
        user: {
          id: '1'
        }
      };
      expect(controller.findOne('1', req)).toBeDefined();
    });
  })

});
