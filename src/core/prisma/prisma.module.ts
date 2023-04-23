import { Global, Module } from '@nestjs/common';
import {
  CandidatesDataAccessService,
  DistrictDataAccessService,
  PartiesDataAccessService,
  PrismaService,
  ProvincesDataAccessService,
  UsersDataAccessService,
  VotingDataAccessService,
} from './services';

@Global()
@Module({
  providers: [
    PrismaService,
    CandidatesDataAccessService,
    DistrictDataAccessService,
    ProvincesDataAccessService,
    UsersDataAccessService,
    VotingDataAccessService,
    PartiesDataAccessService,
  ],
  exports: [
    PrismaService,
    CandidatesDataAccessService,
    DistrictDataAccessService,
    ProvincesDataAccessService,
    UsersDataAccessService,
    VotingDataAccessService,
    PartiesDataAccessService,
  ],
})
export class PrismaModule {}
