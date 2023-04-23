import { Test, TestingModule } from '@nestjs/testing';
import { ProvincesDataAccessService } from './provinces-data-access.service';

describe('ProvincesDataAccessService', () => {
  let service: ProvincesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvincesDataAccessService],
    }).compile();

    service = module.get<ProvincesDataAccessService>(ProvincesDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
