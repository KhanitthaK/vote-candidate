import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService
    ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const headerAuthorization = request.headers.authorization;

    if (!headerAuthorization) {
      throw new UnauthorizedException();
    }

    const jwtToken = headerAuthorization.replace('Bearer ', '');

    request.user =  await this.authService.VerifyToken(jwtToken);

    return true;
  }
}
