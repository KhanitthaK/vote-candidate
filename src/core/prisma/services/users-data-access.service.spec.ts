import { Test, TestingModule } from '@nestjs/testing';
import { UsersDataAccessService } from './users-data-access.service';
import { PrismaService } from './prisma.service';

describe('UsersDataAccessService', () => {
  let service: UsersDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersDataAccessService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn(),
              findFirstOrThrow: jest.fn(),
              count: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersDataAccessService>(UsersDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
