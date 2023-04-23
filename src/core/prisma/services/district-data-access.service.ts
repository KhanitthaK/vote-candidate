import { Injectable } from '@nestjs/common';
import { District, Prisma, PrismaPromise } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class DistrictDataAccessService {
  constructor(private prisma: PrismaService) {}

  public findMany(args?: Prisma.DistrictFindManyArgs): PrismaPromise<District[]> {
    return this.prisma.district.findMany(args);
  }

  public findFirstOrThrow(args?: Prisma.DistrictFindFirstOrThrowArgs): PrismaPromise<District> {
    return this.prisma.district.findFirstOrThrow(args);
  }

  public count(args?: Prisma.DistrictCountArgs): PrismaPromise<number> {
    return this.prisma.district.count(args);
  }
}
