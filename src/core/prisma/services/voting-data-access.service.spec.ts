import { Test, TestingModule } from '@nestjs/testing';
import { VotingDataAccessService } from './voting-data-access.service';

describe('VotingDataAccessService', () => {
  let service: VotingDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingDataAccessService],
    }).compile();

    service = module.get<VotingDataAccessService>(VotingDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
