import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './service/auth.service';

const jwtSecret = 'jehvbjkefmvkdvbdsh';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtSecret,
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
