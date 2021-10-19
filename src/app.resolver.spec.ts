import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { CURRENT_DATE_PUB_SUB } from './constants';
import { CurrentDatePubSub } from './current-date-pub-sub/current-date-pub-sub';

describe('AppResolver', () => {
  let resolver: AppResolver;
  const testDate: Date = new Date();
  const currentDatePubSub: CurrentDatePubSub = new CurrentDatePubSub();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppResolver,
        {
          provide: AppService,
          useValue: {
            getDate: () => testDate,
          }
        },
        {
          provide: CurrentDatePubSub,
          useValue: currentDatePubSub
        }
      ],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });

    it('should return current date', () => {
      expect(resolver.date()).toBe(testDate);
    });

    it('should return live date', () => {
      expect(resolver.currentDate().next()).toBeDefined();
    });
  })
});
