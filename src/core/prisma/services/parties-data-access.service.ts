import { Injectable } from '@nestjs/common';
import { Party, Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class PartiesDataAccessService {
  constructor(private prisma: PrismaService) {}

  public findMany(args?: Prisma.PartyFindManyArgs): PrismaPromise<Party[]> {
    return this.prisma.party.findMany(args);
  }

  public findFirstOrThrow(args?: Prisma.PartyFindFirstOrThrowArgs): PrismaPromise<Party> {
    return this.prisma.party.findFirstOrThrow(args);
  }

  public count(args?: Prisma.PartyCountArgs): PrismaPromise<number> {
    return this.prisma.party.count(args);
  }
}
