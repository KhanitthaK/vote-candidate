import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import type { RedisClientOptions } from 'redis';
import { AuthModule } from './auth/auth.module';
import { HealthModule, PrismaModule } from './core';
import { RedisModule } from './core/redis/redis.module';
import {
  CandidatesModule,
  DistrictsModule,
  PartiesModule,
  SummaryModule,
  UsersModule,
  VotingModule,
} from './modules';
import { HttpExceptionFilter } from './utils/exceptions';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    CacheModule.register<RedisClientOptions>({
      isGlobal: true,
      url: 'redis://localhost:6379',
    }),
    HealthModule,
    PrismaModule,
    VotingModule,
    UsersModule,
    CandidatesModule,
    DistrictsModule,
    SummaryModule,
    PartiesModule,
    RedisModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
