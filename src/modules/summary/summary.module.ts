import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/core';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
