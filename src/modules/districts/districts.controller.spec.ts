import { Test, TestingModule } from '@nestjs/testing';
import { DistrictsController } from './districts.controller';
import { DistrictDataAccessService } from 'src/core/prisma/services';
import { districtExample } from './examples/districts.example';

describe('DistrictsController', () => {
  let controller: DistrictsController;
  let service: DistrictDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DistrictsController],
      providers: [
        {
          provide: DistrictDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DistrictsController>(DistrictsController);
    service = module.get<DistrictDataAccessService>(DistrictDataAccessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#list()', () => {
    it('call list() be return successful', async () => {
      const response = [districtExample];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(response);
      expect(await controller.list()).toEqual([districtExample]);
    });
  });
});
