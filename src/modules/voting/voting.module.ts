import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';

@Module({
  imports: [PrismaModule],
  controllers: [VotingController],
  providers: [VotingService],
})
export class VotingModule {}
