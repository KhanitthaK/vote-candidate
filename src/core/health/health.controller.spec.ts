import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/services/prisma.service';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let healthService: HealthService;
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: HealthCheckService,
          useValue: {
            check: jest.fn(),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            pingCheck: jest.fn(),
          },
        },
      ],
    }).compile();

    healthService = app.get<HealthService>(HealthService);
    healthController = app.get<HealthController>(HealthController);
  });

  it('[healthController] should return "status ok!"', async () => {
    await healthController.healthCheck();

    const healthServiceResponse: HealthCheckResult = {
      status: 'ok',
      info: {},
      error: {},
      details: {},
    };

    jest
      .spyOn(healthService, 'check')
      .mockImplementation(async () => healthServiceResponse);

    expect(await healthService.check()).toBe(healthServiceResponse);
  });
});
