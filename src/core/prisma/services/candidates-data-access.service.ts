import { Injectable } from '@nestjs/common';
import { Candidate, Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class CandidatesDataAccessService {
  constructor(private prisma: PrismaService) {}

  public findMany(args?: Prisma.CandidateFindManyArgs): PrismaPromise<Candidate[]> {
    return this.prisma.candidate.findMany(args);
  }

  public findFirstOrThrow(args?: Prisma.CandidateFindFirstOrThrowArgs): PrismaPromise<Candidate> {
    return this.prisma.candidate.findFirstOrThrow(args);
  }

  public count(args?: Prisma.CandidateCountArgs): PrismaPromise<number> {
    return this.prisma.candidate.count(args);
  }
}
