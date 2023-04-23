import { Test, TestingModule } from '@nestjs/testing';
import { DistrictDataAccessService } from './district-data-access.service';
import { PrismaService } from './prisma.service';

describe('DistrictDataAccessService', () => {
  let service: DistrictDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DistrictDataAccessService,
        {
          provide: PrismaService,
          useValue: {
            district: {
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DistrictDataAccessService>(DistrictDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
