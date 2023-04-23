import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, Voting } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class VotingDataAccessService {
  constructor(private prisma: PrismaService) {}

  public findMany(args?: Prisma.VotingFindManyArgs): PrismaPromise<Voting[]> {
    return this.prisma.voting.findMany(args);
  }

  public findFirstOrThrow(args?: Prisma.VotingFindFirstOrThrowArgs): PrismaPromise<Voting> {
    return this.prisma.voting.findFirstOrThrow(args);
  }

  public count(args?: Prisma.VotingCountArgs): PrismaPromise<number> {
    return this.prisma.voting.count(args);
  }

  public create(args: Prisma.VotingUncheckedCreateInput): PrismaPromise<Voting> {
    return this.prisma.voting.create({
      data: args,
    });
  }

  public candidateRankings(districtId: number) {
    return this.prisma.voting.groupBy({
      where: {
        districtId,
      },
      by: ['candidateId'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });
  }
}
