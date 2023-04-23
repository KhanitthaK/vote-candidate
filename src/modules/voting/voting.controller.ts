import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RedisService } from 'src/core/redis/redis.service';
import { SetAvailableTimeRequest, VotingRequest } from './dto';
import { VotingService } from './voting.service';

@ApiTags('Voting')
@Controller('voting')
export class VotingController {
  constructor(
    private readonly votingService: VotingService,
    private readonly redisService: RedisService,
  ) {}

  @Post('available')
  @ApiOperation({
    summary: 'Set Available vote time',
  })
  @ApiOkResponse({
    description: 'Set Available vote time',
  })
  async setAvailableTime(@Body() { isAvailableTime }: SetAvailableTimeRequest) {
    await this.redisService.setCache('is-available-time', isAvailableTime.toString());

    return { isAvailableTime };
  }

  @Post()
  @ApiOperation({
    summary: 'Vote Candidate',
  })
  @ApiOkResponse({
    description: 'Vote Candidate',
  })
  async vote(@Body() { identityCardNumber, candidateId }: VotingRequest) {
    const isAvailable = await this.redisService.getCache('is-available-time');

    if (isAvailable !== 'true') throw new ForbiddenException('Unavailable time to vote');

    return this.votingService.voting({
      identityCardNumber,
      candidateId,
    });
  }
}
