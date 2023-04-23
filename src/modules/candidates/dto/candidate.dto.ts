import { ApiProperty } from '@nestjs/swagger';
import { District, Party } from '@prisma/client';
import { DistrictResponse } from 'src/modules/districts/dto';
import { PartyResponse } from 'src/modules/parties/dto/party.dto';
import { candidateExample } from '../examples/candidates.example';

export class CandidateResponse {
  @ApiProperty({
    description: 'Candidate UUID',
    example: candidateExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'Candidate name',
    example: candidateExample.name,
  })
  name: string;

  @ApiProperty({
    description: 'Candidate district ID',
    example: candidateExample.districtId,
  })
  districtId: number;

  @ApiProperty({
    description: 'Candidate Party ID',
    example: candidateExample.partyId,
  })
  partyId: number;

  @ApiProperty({
    description: 'Candidate number',
    example: candidateExample.no,
  })
  no: number;

  @ApiProperty({
    description: 'Candidate created date',
    example: candidateExample.createdAt,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Candidate updated date',
    example: candidateExample.updatedAt,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Candidate deleted date',
    example: candidateExample.deletedAt,
    required: false,
  })
  deletedAt?: Date;

  @ApiProperty({
    description: 'District information',
    type: DistrictResponse,
  })
  district?: District;

  @ApiProperty({
    description: 'Party Information',
    type: PartyResponse,
  })
  party?: Party;
}
