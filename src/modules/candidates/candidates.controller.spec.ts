import { Test, TestingModule } from '@nestjs/testing';
import { CandidatesController } from './candidates.controller';
import { CandidatesDataAccessService } from 'src/core/prisma/services';
import { candidateExample } from './examples/candidates.example';

describe('CandidatesController', () => {
  let controller: CandidatesController;
  let service: CandidatesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CandidatesController],
      providers: [
        {
          provide: CandidatesDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CandidatesController>(CandidatesController);
    service = module.get<CandidatesDataAccessService>(CandidatesDataAccessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#list()', () => {
    it('call list() be return successful', async () => {
      const response = [candidateExample];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(response);
      expect(await controller.list()).toEqual([candidateExample]);
    });
  });
});
