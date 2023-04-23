import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/core';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [PrismaModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
