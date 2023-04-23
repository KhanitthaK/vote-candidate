import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core';
import { CandidatesController } from './candidates.controller';
import { CandidatesService } from './candidates.service';

@Module({
  imports: [PrismaModule],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
