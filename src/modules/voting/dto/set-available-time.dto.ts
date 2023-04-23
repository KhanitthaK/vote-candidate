import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class SetAvailableTimeRequest {
  @ApiProperty({
    description: 'Is Available vote time?',
    example: true,
  })
  @IsBoolean()
  isAvailableTime: boolean;
}
