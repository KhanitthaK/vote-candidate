import { Test, TestingModule } from '@nestjs/testing';
import { VotingService } from './voting.service';
import {
  CandidatesDataAccessService,
  UsersDataAccessService,
  VotingDataAccessService,
} from 'src/core/prisma/services';
import { userExample } from '../users/examples/users.example';
import { candidateExample } from '../candidates/examples/candidates.example';
import { ForbiddenException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { votingExample } from './example/voting.example';

describe('VotingService', () => {
  let service: VotingService;
  let candidatesDataAccessService: CandidatesDataAccessService;
  let usersDataAccessService: UsersDataAccessService;
  let votingDataAccessService: VotingDataAccessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotingService,
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
          provide: VotingDataAccessService,
          useValue: {
            findMany: jest.fn(),
            findFirstOrThrow: jest.fn(),
            count: jest.fn(),
            create: jest.fn(),
            candidateRankings: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<VotingService>(VotingService);
    candidatesDataAccessService = module.get<CandidatesDataAccessService>(
      CandidatesDataAccessService,
    );
    usersDataAccessService = module.get<UsersDataAccessService>(UsersDataAccessService);
    votingDataAccessService = module.get<VotingDataAccessService>(VotingDataAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#vote()', () => {
    it('call vote() be return successful', async () => {
      jest.spyOn(usersDataAccessService, 'findFirstOrThrow').mockResolvedValueOnce(userExample);
      jest
        .spyOn(candidatesDataAccessService, 'findFirstOrThrow')
        .mockResolvedValueOnce(candidateExample);
      expect(
        await service.voting({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        }),
      ).toEqual(undefined);
    });

    it('call vote() service error candidate not found', async () => {
      jest.spyOn(usersDataAccessService, 'findFirstOrThrow').mockResolvedValueOnce(userExample);
      jest
        .spyOn(candidatesDataAccessService, 'findFirstOrThrow')
        .mockRejectedValueOnce(new Error());
      service
        .voting({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(new NotFoundException('Candidate not found'));
        });
    });

    it('call vote() service error user not found', async () => {
      jest.spyOn(usersDataAccessService, 'findFirstOrThrow').mockRejectedValueOnce(new Error());
      jest
        .spyOn(candidatesDataAccessService, 'findFirstOrThrow')
        .mockResolvedValueOnce(candidateExample);
      service
        .voting({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(new NotFoundException('User not found'));
        });
    });

    it('call vote() service error district not match', async () => {
      jest.spyOn(usersDataAccessService, 'findFirstOrThrow').mockResolvedValueOnce(userExample);
      jest
        .spyOn(candidatesDataAccessService, 'findFirstOrThrow')
        .mockResolvedValueOnce({ ...candidateExample, districtId: 10 });
      service
        .voting({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(new ForbiddenException('District not match'));
        });
    });

    it('call vote() service error this user already voted', async () => {
      jest.spyOn(usersDataAccessService, 'findFirstOrThrow').mockResolvedValueOnce(userExample);
      jest
        .spyOn(candidatesDataAccessService, 'findFirstOrThrow')
        .mockResolvedValueOnce(candidateExample);
      jest.spyOn(votingDataAccessService, 'create').mockRejectedValueOnce(new Error());
      service
        .voting({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(
            new HttpException('This user already voted', HttpStatus.BAD_REQUEST),
          );
        });
    });
  });
});
