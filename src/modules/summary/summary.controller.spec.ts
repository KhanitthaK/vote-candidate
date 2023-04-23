import { Test, TestingModule } from '@nestjs/testing';
import { SummaryController } from './summary.controller';
import {
  CandidatesDataAccessService,
  DistrictDataAccessService,
  PartiesDataAccessService,
  UsersDataAccessService,
  VotingDataAccessService,
} from 'src/core/prisma/services';
import { candidateSummaryExample } from './examples/summary-candaidate.example';
import { candidateExample } from '../candidates/examples/candidates.example';
import { districtExample } from '../districts/examples/districts.example';
import { partyExample } from '../parties/examples/parties.example';
import { AuthService } from 'src/auth/service/auth.service';

describe('SummaryController', () => {
  let controller: SummaryController;
  let candidatesDataAccessService: CandidatesDataAccessService;
  let districtDataAccessService: DistrictDataAccessService;
  let usersDataAccessService: UsersDataAccessService;
  let votingDataAccessService: VotingDataAccessService;
  let partiesDataAccessService: PartiesDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummaryController],
      providers: [
        {
          provide: CandidatesDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: UsersDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: DistrictDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: PartiesDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
          },
        },
        {
          provide: VotingDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
            candidateRankings: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            GetAccessToken: jest.fn(),
            VerifyToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SummaryController>(SummaryController);
    candidatesDataAccessService = module.get<CandidatesDataAccessService>(
      CandidatesDataAccessService,
    );
    districtDataAccessService = module.get<DistrictDataAccessService>(DistrictDataAccessService);
    usersDataAccessService = module.get<UsersDataAccessService>(UsersDataAccessService);
    votingDataAccessService = module.get<VotingDataAccessService>(VotingDataAccessService);
    partiesDataAccessService = module.get<PartiesDataAccessService>(PartiesDataAccessService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#candidateSummary()', () => {
    it('call candidateSummary() be return successful', async () => {
      const response = candidateSummaryExample;
      jest
        .spyOn(candidatesDataAccessService, 'findFirstOrThrow')
        .mockResolvedValueOnce(candidateExample);
      jest
        .spyOn(votingDataAccessService, 'count')
        .mockResolvedValueOnce(candidateSummaryExample.totalVote);
      jest
        .spyOn(usersDataAccessService, 'count')
        .mockResolvedValueOnce(candidateSummaryExample.totalUser);
      jest
        .spyOn(votingDataAccessService, 'candidateRankings')
        .mockResolvedValueOnce([{ candidateId: candidateExample.id }] as any);
      expect(await controller.candidateSummary()).toEqual(response);
    });
  });

  describe('#allDistrictSummary()', () => {
    it('call allDistrictSummary() be return successful', async () => {
      const candidates = [{ ...candidateExample, party: partyExample }];
      const district = { ...districtExample, candidateInformation: candidates };
      jest.spyOn(districtDataAccessService, 'findMany').mockResolvedValueOnce([district]);
      jest.spyOn(votingDataAccessService, 'count').mockResolvedValueOnce(3);
      jest.spyOn(usersDataAccessService, 'count').mockResolvedValueOnce(8);
      jest
        .spyOn(votingDataAccessService, 'candidateRankings')
        .mockResolvedValueOnce([{ candidateId: candidateExample.id }] as any);
      expect(
        await controller.allDistrictSummary({
          offset: 0,
          limit: 1,
        }),
      ).toEqual({
        data: [
          {
            id: districtExample.id,
            districtNumber: districtExample.districtNumber,
            province: {
              id: district.province.id,
              nameEn: 'Bangkok',
              nameTh: 'กรุงเทพมหานคร',
            },
            winner: 1,
            totalVoter: 3,
            totalEligibleUser: 8,
            percentage: 37.5,
            candidates: [
              {
                id: candidateExample.id,
                name: candidateExample.name,
                no: 33,
                ranking: 1,
                party: {
                  id: partyExample.id,
                  name: partyExample.name,
                },
              },
            ],
          },
        ],
        offset: 0,
        limit: 1,
      });
    });
  });

  describe('#districtSummary()', () => {
    it('call districtSummary() be return successful', async () => {
      const candidate = { ...candidateExample, party: partyExample, ranking: 1 };
      const district = { ...districtExample, candidateInformation: [candidate] };
      jest.spyOn(districtDataAccessService, 'findFirstOrThrow').mockResolvedValueOnce(district);
      jest.spyOn(votingDataAccessService, 'count').mockResolvedValueOnce(3);
      jest.spyOn(usersDataAccessService, 'count').mockResolvedValueOnce(8);
      jest
        .spyOn(votingDataAccessService, 'candidateRankings')
        .mockResolvedValueOnce([{ candidateId: candidateExample.id }] as any);
      expect(await controller.districtSummary(district.id.toString())).toEqual({
        id: district.id,
        districtNumber: district.districtNumber,
        province: district.province,
        totalVoter: 3,
        totalEligibleUser: 8,
        percentage: (3 * 100) / 8,
        candidates: [
          {
            id: candidate.id,
            name: candidate.name,
            no: candidate.no,
            ranking: 1,
            party: { id: candidate.party?.id, name: candidate.party?.name },
          },
        ],
      });
    });
  });

  describe('#partySummary()', () => {
    it('call partySummary() be return successful', async () => {
      const candidate = { ...candidateExample, party: partyExample };
      const party = { ...partyExample, candidateInformation: [candidate] };
      jest.spyOn(partiesDataAccessService, 'findFirstOrThrow').mockResolvedValueOnce(party);
      jest
        .spyOn(votingDataAccessService, 'candidateRankings')
        .mockResolvedValueOnce([{ candidateId: candidateExample.id }] as any);
      expect(await controller.partySummary(party.id.toString())).toEqual({
        totalCandidate: 1,
        winner: 1,
        candidates: [
          {
            id: candidate.id,
            name: candidate.name,
            no: candidate.no,
            ranking: 1,
            party: { id: candidate.party?.id, name: candidate.party?.name },
          },
        ],
      });
    });
  });
});
