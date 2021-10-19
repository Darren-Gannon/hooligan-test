import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getRepositoryToken } from '@nestjs/typeorm';
import { VideoService } from '../video/video.service';
import { WATCH_MODULE_CONFIG } from './constants';
import { Watch } from './entities/watch.entity';
import { WatchModuleConfig } from './watch-module-config';
import { WatchService } from './watch.service';

describe('WatchService', () => {
  let service: WatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchService,
        { 
          provide: getConnectionToken(),
          useValue: {}
        },
        { 
          provide: getRepositoryToken(Watch),
          useValue: {}
        },
        { 
          provide: VideoService,
          useValue: {}
        },
        { 
          provide: WATCH_MODULE_CONFIG,
          useValue: (<WatchModuleConfig>{watchLimit: 1})
        }
      ],
    }).compile();

    service = module.get<WatchService>(WatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
