import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CandidatesDataAccessService } from 'src/core/prisma/services/candidates-data-access.service';
import { UsersDataAccessService } from 'src/core/prisma/services/users-data-access.service';
import { VotingDataAccessService } from 'src/core/prisma/services/voting-data-access.service';
import { VotingCreateRequest } from './dto';

@Injectable()
export class VotingService {
  constructor(
    private readonly candidatesDataAccess: CandidatesDataAccessService,
    private readonly usersDataAccess: UsersDataAccessService,
    private readonly votingDataAccess: VotingDataAccessService,
  ) {}

  async voting({ identityCardNumber, candidateId }) {
    const user = await this.findUser(identityCardNumber);
    const candidate = await this.findCandidate(candidateId);

    if (user.districtId !== candidate.districtId)
      {throw new ForbiddenException('District not match');}

    return this.createVoting({
      userId: user.id,
      candidateId: candidate.id,
      districtId: user.districtId,
    });
  }

  private async findUser(identityCardNumber: string) {
    try {
      return await this.usersDataAccess.findFirstOrThrow({
        where: { identityCardNumber },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }

  private async findCandidate(id: string) {
    try {
      return await this.candidatesDataAccess.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Candidate not found');
    }
  }

  private async createVoting(args: VotingCreateRequest) {
    try {
      return await this.votingDataAccess.create(args);
    } catch (error) {
      throw new HttpException('This user already voted', HttpStatus.BAD_REQUEST);
    }
  }
}
