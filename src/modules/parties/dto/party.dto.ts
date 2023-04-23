import { ApiProperty } from '@nestjs/swagger';
import { CandidateResponse } from 'src/modules/candidates/dto';
import { candidateExample } from 'src/modules/candidates/examples/candidates.example';
import { partyExample } from '../examples/parties.example';

export class PartyResponse {
  @ApiProperty({
    description: 'Party ID',
    example: partyExample.id,
  })
  id: number;

  @ApiProperty({
    description: 'Party Name',
    example: partyExample.name,
  })
  name: string;

  @ApiProperty({
    description: 'Party created date',
    example: partyExample.createdAt,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Party updated date',
    example: partyExample.updatedAt,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Party deleted date',
    example: partyExample.deletedAt,
    required: false,
  })
  deletedAt?: Date;

  @ApiProperty({
    description: `Party's Candidates`,
    example: [candidateExample],
  })
  candidateInformation?: CandidateResponse[];
}
