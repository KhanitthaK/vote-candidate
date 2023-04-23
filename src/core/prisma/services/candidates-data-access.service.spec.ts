import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesDataAccessService } from './candidates-data-access.service';
import { PrismaService } from './prisma.service';

describe('CandidatesDataAccessService', () => {
  let service: CandidatesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CandidatesDataAccessService,
        {
          provide: PrismaService,
          useValue: {
            candidate: {
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CandidatesDataAccessService>(CandidatesDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
