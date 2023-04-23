import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesDataAccessService } from './candidates-data-access.service';

describe('CandidatesDataAccessService', () => {
  let service: CandidatesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CandidatesDataAccessService],
    }).compile();

    service = module.get<CandidatesDataAccessService>(CandidatesDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
