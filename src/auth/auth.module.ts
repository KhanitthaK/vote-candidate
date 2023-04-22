import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './service/auth.service';

const jwtSecret = 'xxxxxx';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
