import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { PrismaService } from '../prisma/services/prisma.service';

@Injectable()
export class HealthService extends HealthIndicator {
  constructor(
    private healthCheckService: HealthCheckService,
    private prismaService: PrismaService
  ) {
    super();
  }

  public check(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.isDatabaseHealthy('database'),
    ]);
  }

  private async isDatabaseHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      await this.prismaService.$queryRaw`SELECT 1`;

      return this.getStatus(key, true);
    } catch (error) {
      throw new HealthCheckError('Prisma check failed', error);
    }
  }
}
