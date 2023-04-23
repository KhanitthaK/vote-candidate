import { Body, CACHE_MANAGER, Controller, ForbiddenException, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { SetAvailableTimeRequest, VotingRequest } from './dto';
import { VotingService } from './voting.service';

@ApiTags('Voting')
@Controller('voting')
export class VotingController {
  constructor(
    private readonly votingService: VotingService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Post('available')
  @ApiOperation({
    summary: 'Set Available vote time',
  })
  @ApiOkResponse({
    description: 'Set Available vote time',
  })
  setAvailableTime(@Body() { isAvailableTime }: SetAvailableTimeRequest) {
    return this.cacheManager.set('is-available-time', isAvailableTime.toString());
  }

  @Post()
  @ApiOperation({
    summary: 'Vote Candidate',
  })
  @ApiOkResponse({
    description: 'Vote Candidate',
  })
  async vote(@Body() { identityCardNumber, candidateId }: VotingRequest) {
    const isAvailable = await this.cacheManager.get('is-available-time');

    if (isAvailable !== 'true') throw new ForbiddenException('Unavailable time to vote');

    return this.votingService.voting({
      identityCardNumber,
      candidateId,
    });
  }
}
