import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core';
import { RedisModule } from 'src/core/redis/redis.module';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';

@Module({
  imports: [PrismaModule, RedisModule],
  controllers: [VotingController],
  providers: [VotingService],
})
export class VotingModule {}
