import { Test, TestingModule } from '@nestjs/testing';
import { WatchResolver } from './watch.resolver';
import { WatchService } from './watch.service';

describe('WatchResolver', () => {
  let resolver: WatchResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WatchResolver, 
        {
          provide: WatchService,
          useValue: {}
        }
      ],
    }).compile();

    resolver = module.get<WatchResolver>(WatchResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
