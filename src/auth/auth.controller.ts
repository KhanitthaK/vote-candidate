import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':userId')
  @ApiOperation({
    summary: 'Grant token',
  })
  @ApiOkResponse({
    description: 'Grant token',
  })
  grant(@Param('userId') userId: string): any {
    return this.authService.GetAccessToken({ userId, acl: ['full-access'] });
  }
}
