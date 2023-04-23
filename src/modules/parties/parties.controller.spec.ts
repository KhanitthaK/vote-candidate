import { Test, TestingModule } from '@nestjs/testing';
import { PartiesController } from './parties.controller';
import { PartiesDataAccessService } from 'src/core/prisma/services';
import { partyExample } from './examples/parties.example';

describe('PartiesController', () => {
  let controller: PartiesController;
  let service: PartiesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartiesController],
      providers: [
        {
          provide: PartiesDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PartiesController>(PartiesController);
    service = module.get<PartiesDataAccessService>(PartiesDataAccessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#list()', () => {
    it('call list() be return successful', async () => {
      const response = [partyExample];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(response);
      expect(await controller.list()).toEqual([partyExample]);
    });
  });
});
