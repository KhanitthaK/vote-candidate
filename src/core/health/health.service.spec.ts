import { HealthCheckService } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/services/prisma.service';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let healthService: HealthService;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
            onModuleInit: jest.fn(),
            enableShutdownHooks: jest.fn(),
          },
        },
      ],
    }).compile();

    healthService = module.get<HealthService>(HealthService);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);
  });

  it('should be defined', async () => {
    await healthService.check();

    expect(healthService).toBeDefined();
    expect(healthCheckService.check).toHaveBeenCalledTimes(1);
    expect(healthCheckService.check).toHaveBeenCalledWith([expect.any(Function)]);
  });
});
