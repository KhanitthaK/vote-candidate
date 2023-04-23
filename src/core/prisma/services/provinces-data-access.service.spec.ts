import { Test, TestingModule } from '@nestjs/testing';
import { ProvincesDataAccessService } from './provinces-data-access.service';
import { PrismaService } from './prisma.service';

describe('ProvincesDataAccessService', () => {
  let service: ProvincesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvincesDataAccessService,
        {
          provide: PrismaService,
          useValue: {
            province: {
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProvincesDataAccessService>(ProvincesDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
