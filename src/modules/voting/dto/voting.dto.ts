import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, Length } from 'class-validator';

export class VotingRequest {
  @ApiProperty({
    description: 'Thai Identity Card Number',
    example: '0000000000001',
  })
  @Length(13)
  @IsNumberString()
  identityCardNumber: string;

  @ApiProperty({
    description: 'Candidate UUID',
    example: '001d3ce5-514d-48ec-8c4a-436cc46b7be7',
  })
  candidateId: string;
}

export interface VotingCreateRequest {
  candidateId: string;
  districtId: number;
  userId: string;
}
