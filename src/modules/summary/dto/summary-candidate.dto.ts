import { ApiProperty } from '@nestjs/swagger';
import { candidateSummaryExample } from '../examples/summary-candaidate.example';

export class CandidateSummaryResponse {
  @ApiProperty({
    description: 'Total candidate voted',
    example: candidateSummaryExample.totalVote,
  })
  totalVote: number;

  @ApiProperty({
    description: 'District Ranking',
    example: candidateSummaryExample.ranking,
  })
  ranking: number;

  @ApiProperty({
    description: 'Total Voter in district',
    example: candidateSummaryExample.totalUser,
  })
  totalUser: number;

  @ApiProperty({
    description: ' totalVote / totalUser * 100',
    example: candidateSummaryExample.percentage,
  })
  percentage: number;
}
