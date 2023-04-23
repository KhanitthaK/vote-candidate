import { Injectable } from '@nestjs/common';
import { Prisma, PrismaPromise, User } from '@prisma/client';
import { PrismaService } from './prisma.service';

@Injectable()
export class UsersDataAccessService {
  constructor(private prisma: PrismaService) {}

  public findMany(args?: Prisma.UserFindManyArgs): PrismaPromise<User[]> {
    return this.prisma.user.findMany(args);
  }

  public findFirstOrThrow(args?: Prisma.UserFindFirstOrThrowArgs): PrismaPromise<User> {
    return this.prisma.user.findFirstOrThrow(args);
  }

  public count(args?: Prisma.UserCountArgs): PrismaPromise<number> {
    return this.prisma.user.count(args);
  }

  public create(data: Prisma.UserUncheckedCreateInput): PrismaPromise<User> {
    return this.prisma.user.create({
      data,
    });
  }
}
