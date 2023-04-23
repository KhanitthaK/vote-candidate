import { Test, TestingModule } from '@nestjs/testing';
import { PartiesDataAccessService } from './parties-data-access.service';

describe('PartiesDataAccessService', () => {
  let service: PartiesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartiesDataAccessService],
    }).compile();

    service = module.get<PartiesDataAccessService>(PartiesDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
