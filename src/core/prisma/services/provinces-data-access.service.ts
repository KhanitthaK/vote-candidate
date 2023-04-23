import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, Province } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProvincesDataAccessService {
  constructor(private prisma: PrismaService) {}

  public findMany(args?: Prisma.ProvinceFindManyArgs): PrismaPromise<Province[]> {
    return this.prisma.province.findMany(args);
  }

  public findFirstOrThrow(args?: Prisma.ProvinceFindFirstOrThrowArgs): PrismaPromise<Province> {
    return this.prisma.province.findFirstOrThrow(args);
  }

  public count(args?: Prisma.ProvinceCountArgs): PrismaPromise<number> {
    return this.prisma.province.count(args);
  }
}
