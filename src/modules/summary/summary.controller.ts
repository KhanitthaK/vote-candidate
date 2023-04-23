import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'src/common/dto';
import {
  CandidatesDataAccessService,
  DistrictDataAccessService,
  PartiesDataAccessService,
  UsersDataAccessService,
  VotingDataAccessService,
} from 'src/core/prisma/services';
import { AuthGuard } from 'src/utils/guards/auth.guard';
import { CandidateDecorator } from '../candidates/decorator/candidate.decorator';
import { CandidateResponse } from '../candidates/dto';
import { DistrictResponse } from '../districts/dto/district.dto';
import { PartyResponse } from '../parties/dto/party.dto';
import { CandidateSummaryResponse } from './dto/summary-candidate.dto';

@ApiTags('Summary')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('summary')
export class SummaryController {
  constructor(
    private readonly candidatesDataAccessService: CandidatesDataAccessService,
    private readonly votingDataAccessService: VotingDataAccessService,
    private readonly usersDataAccessService: UsersDataAccessService,
    private readonly districtDataAccessService: DistrictDataAccessService,
    private readonly partiesDataAccessService: PartiesDataAccessService,
  ) {}

  @Post('candidate/:candidateId')
  @ApiOperation({
    summary: 'Candidate summary by candidate ID',
  })
  @ApiOkResponse({
    description: 'Candidate summary by candidate ID',
    type: CandidateSummaryResponse,
  })
  async candidateSummary(@Param('candidateId') candidateId?: string) {
    const candidate = await this.candidatesDataAccessService.findFirstOrThrow({
      where: { id: candidateId },
      include: { district: true },
    });

    const totalVote = await this.votingDataAccessService.count({ where: { candidateId } });
    const totalUser = await this.usersDataAccessService.count({
      where: { districtId: candidate.districtId },
    });

    const rankings = await this.votingDataAccessService.candidateRankings(candidate.districtId);
    const candidateInformation = CandidateDecorator.formatCandidateWithRanking(candidate, rankings);

    return {
      totalVote,
      ranking: candidateInformation.ranking,
      totalUser,
      percentage: (totalVote * 100) / totalUser,
    };
  }

  @Post('district/all')
  @ApiOperation({
    summary: 'All district summary',
  })
  @ApiOkResponse({
    description: 'All district summary',
  })
  async allDistrictSummary(@Body() { offset, limit }: Pagination) {
    const districts: DistrictResponse[] = await this.districtDataAccessService.findMany({
      take: limit,
      skip: offset,
      include: { province: true, candidateInformation: { include: { party: true } } },
    });

    const districtsWithRanking = districts?.map(async district => {
      let winner = 0;

      const districtId = district.id;
      const totalVoter = await this.votingDataAccessService.count({ where: { districtId } });
      const totalEligibleUser = await this.usersDataAccessService.count({ where: { districtId } });
      const rankings = await this.votingDataAccessService.candidateRankings(districtId);
      const candidates = district.candidateInformation?.map(candidate => {
        const candidateWithRanking = CandidateDecorator.formatCandidateWithRanking(
          candidate,
          rankings,
        );

        if (candidateWithRanking.ranking === 1) winner++;

        return candidateWithRanking;
      });

      return {
        id: districtId,
        districtNumber: district.districtNumber,
        province: district.province,
        winner,
        totalVoter,
        totalEligibleUser,
        percentage: (totalVoter * 100) / totalEligibleUser,
        candidates: await Promise.all(candidates),
      };
    });

    return {
      limit,
      offset,
      data: await Promise.all(districtsWithRanking),
    };
  }

  @Post('district/:districtId')
  @ApiOperation({
    summary: 'District summary by district ID',
  })
  @ApiOkResponse({
    description: 'District summary by district ID',
  })
  async districtSummary(@Param('districtId') id?: string) {
    const districtId = Number(id);
    const district: DistrictResponse = await this.districtDataAccessService.findFirstOrThrow({
      where: { id: districtId },
      include: { province: true, candidateInformation: { include: { party: true } } },
    });

    const totalVoter = await this.votingDataAccessService.count({ where: { districtId } });
    const totalEligibleUser = await this.usersDataAccessService.count({ where: { districtId } });
    const rankings = await this.votingDataAccessService.candidateRankings(districtId);
    const candidates: CandidateResponse[] = district.candidateInformation;
    const candidatesWithRanking = candidates.map(candidate => {
      return CandidateDecorator.formatCandidateWithRanking(candidate, rankings);
    });

    return {
      id: district.id,
      districtNumber: district.districtNumber,
      province: district.province,
      totalVoter,
      totalEligibleUser,
      percentage: (totalVoter * 100) / totalEligibleUser,
      candidates: candidatesWithRanking,
    };
  }

  @Post('party/:partyId')
  @ApiOperation({
    summary: 'Party summary by party ID',
  })
  @ApiOkResponse({
    description: 'Party summary party ID',
  })
  async partySummary(@Param('partyId') id?: string) {
    const partyId = Number(id);
    const party: PartyResponse = await this.partiesDataAccessService.findFirstOrThrow({
      where: { id: partyId },
      include: { candidateInformation: true },
    });

    let winner = 0;

    const candidates = await Promise.all(
      party.candidateInformation?.map(async candidate => {
        const rankings = await this.votingDataAccessService.candidateRankings(candidate.districtId);
        const candidateInformation = CandidateDecorator.formatCandidateWithRanking(
          candidate,
          rankings,
        );

        const ranking = candidateInformation.ranking;

        if (ranking === 1) winner++;

        return {
          ranking,
          ...candidateInformation,
        };
      }),
    );

    return {
      totalCandidate: party.candidateInformation?.length,
      winner,
      candidates,
    };
  }
}
