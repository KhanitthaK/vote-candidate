import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
            verify: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#GetAccessToken()', () => {
    it('call GetAccessToken() be return successful', async () => {
      jest.spyOn(jwtService, 'signAsync').mockResolvedValueOnce('nsvjmfl');
      expect(
        await service.GetAccessToken({
          userId: 'nbvdjkm',
          acl: [],
        }),
      ).toEqual({ token: 'nsvjmfl' });
    });
  });

  describe('#VerifyToken()', () => {
    it('call VerifyToken() be return successful', async () => {
      const data = {
        userId: 'nbvdjkm',
        acl: [],
      };
      jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => data);
      expect(await service.VerifyToken('bhbskvld')).toEqual({
        userId: 'nbvdjkm',
        acl: [],
      });
    });

    it('call VerifyToken() be error Unauthorized', async () => {
      const data = {
        acl: [],
      };
      jest.spyOn(jwtService, 'verify').mockImplementationOnce(() => data);
      service.VerifyToken('bhbskvld').catch(error => {
        expect(error).toEqual(new UnauthorizedException());
      });
    });
  });
});
