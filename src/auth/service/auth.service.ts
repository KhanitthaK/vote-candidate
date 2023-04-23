import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { TokenPayload } from '../model/auth.model';

dayjs.locale('th');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async GetAccessToken(payload: TokenPayload) {
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async VerifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify<TokenPayload>(token);

      if (!decoded.userId) throw new UnauthorizedException();

      return { userId: decoded.userId, acl: decoded.acl || [] };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      if (error.message === 'jwt malformed') {
        throw new UnauthorizedException('Jwt malformed');
      }

      throw new UnauthorizedException();
    }
  }
}
