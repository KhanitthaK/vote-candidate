import { Test, TestingModule } from '@nestjs/testing';
import { DistrictDataAccessService } from './district-data-access.service';

describe('DistrictDataAccessService', () => {
  let service: DistrictDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DistrictDataAccessService],
    }).compile();

    service = module.get<DistrictDataAccessService>(DistrictDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
