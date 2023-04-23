import { Test, TestingModule } from '@nestjs/testing';
import { PartiesDataAccessService } from './parties-data-access.service';
import { PrismaService } from './prisma.service';

describe('PartiesDataAccessService', () => {
  let service: PartiesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartiesDataAccessService,
        {
          provide: PrismaService,
          useValue: {
            party: {
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PartiesDataAccessService>(PartiesDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
