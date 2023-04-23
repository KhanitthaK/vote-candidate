import { Test, TestingModule } from '@nestjs/testing';
import { VotingController } from './voting.controller';
import { VotingService } from './voting.service';
import { RedisService } from 'src/core/redis/redis.service';
import { userExample } from '../users/examples/users.example';
import { candidateExample } from '../candidates/examples/candidates.example';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { votingExample } from './example/voting.example';

describe('VotingController', () => {
  let controller: VotingController;
  let service: VotingService;
  let redis: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingController],
      providers: [
        {
          provide: RedisService,
          useValue: {
            getCache: jest.fn(),
            setCache: jest.fn(),
          },
        },
        {
          provide: VotingService,
          useValue: {
            voting: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<VotingController>(VotingController);
    service = module.get<VotingService>(VotingService);
    redis = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#setAvailableTime()', () => {
    it('call setAvailableTime() be return successful', async () => {
      jest.spyOn(redis, 'setCache').mockResolvedValueOnce();
      expect(await controller.setAvailableTime({ isAvailableTime: true })).toEqual({
        isAvailableTime: true,
      });
    });
  });

  describe('#vote()', () => {
    it('call vote() be error unavailable time to vote ', async () => {
      jest.spyOn(redis, 'getCache').mockResolvedValueOnce('false');
      controller
        .vote({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(new ForbiddenException('Unavailable time to vote'));
        });
    });

    it('call vote() be return successful', async () => {
      jest.spyOn(redis, 'getCache').mockResolvedValueOnce('true');
      jest.spyOn(service, 'voting').mockResolvedValueOnce(votingExample);
      expect(
        await controller.vote({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        }),
      ).toEqual(votingExample);
    });

    it('call vote() service be candidate not found', async () => {
      jest.spyOn(redis, 'getCache').mockResolvedValueOnce('true');
      jest
        .spyOn(service, 'voting')
        .mockRejectedValueOnce(new NotFoundException('Candidate not found'));
      controller
        .vote({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(new NotFoundException('Candidate not found'));
        });
    });

    it('call vote() service be user not found', async () => {
      jest.spyOn(redis, 'getCache').mockResolvedValueOnce('true');
      jest.spyOn(service, 'voting').mockRejectedValueOnce(new NotFoundException('User not found'));
      controller
        .vote({
          identityCardNumber: userExample.identityCardNumber,
          candidateId: candidateExample.id,
        })
        .catch(error => {
          expect(error).toEqual(new NotFoundException('User not found'));
        });
    });
  });
});
