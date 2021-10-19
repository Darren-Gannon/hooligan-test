import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

describe('AppResolver', () => {
  let resolver: AppResolver;
  const testDate: Date = new Date();

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
      ],
    }).compile();

    resolver = module.get<AppResolver>(AppResolver);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(resolver).toBeDefined();
    });

    it('should return current date', () => {
      expect(resolver.getDate()).toBe(testDate);
    });
  })
});
