import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { userExample } from './examples/users.example';
import { UsersDataAccessService } from 'src/core/prisma/services';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersDataAccessService>(UsersDataAccessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#list()', () => {
    it('call list() be return successful', async () => {
      const response = [userExample];
      jest.spyOn(service, 'findMany').mockResolvedValueOnce(response);
      expect(await controller.list()).toEqual([userExample]);
    });
  });

  describe('#create()', () => {
    it('call list() be return successful', async () => {
      const response = userExample;
      jest.spyOn(service, 'create').mockResolvedValueOnce(response);
      expect(
        await controller.create({
          identityCardNumber: '0000000000001',
          name: 'test',
          districtId: 1,
        }),
      ).toEqual(userExample);
    });
  });
});
