import { Test, TestingModule } from '@nestjs/testing';
import { VotingDataAccessService } from './voting-data-access.service';
import { PrismaService } from './prisma.service';

describe('VotingDataAccessService', () => {
  let service: VotingDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotingDataAccessService,
        {
          provide: PrismaService,
          useValue: {
            voting: {
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<VotingDataAccessService>(VotingDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
