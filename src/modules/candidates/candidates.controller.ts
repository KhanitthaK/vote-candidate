import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CandidatesDataAccessService } from 'src/core/prisma/services';
import { CandidateResponse } from './dto';

@ApiTags('Candidate')
@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesDataAccessService: CandidatesDataAccessService) {}
  @Get(':districtId')
  @ApiOperation({
    summary: 'List Candidate',
  })
  @ApiOkResponse({
    description: 'List Candidate',
    type: [CandidateResponse],
  })
  list(@Param('districtId') districtId?: string) {
    return this.candidatesDataAccessService.findMany({
      where: { districtId: Number(districtId) },
    });
  }
}
