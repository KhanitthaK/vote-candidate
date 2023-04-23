import { ApiProperty } from '@nestjs/swagger';
import { Province } from '@prisma/client';
import { CandidateResponse } from 'src/modules/candidates/dto';
import { candidateExample } from 'src/modules/candidates/examples/candidates.example';
import { districtExample } from '../examples/districts.example';

export class DistrictResponse {
  @ApiProperty({
    description: 'District ID',
    example: districtExample.id,
  })
  id: number;

  @ApiProperty({
    description: 'Province ID',
    example: districtExample.provinceId,
  })
  provinceId: number;

  @ApiProperty({
    description: 'District Number',
    example: districtExample.districtNumber,
  })
  districtNumber: number;

  @ApiProperty({
    description: 'Province Information',
    example: {
      id: 1,
      nameTh: 'กรุงเทพมหานคร',
      nameEn: 'Bangkok',
    },
  })
  province?: Province;

  @ApiProperty({
    description: 'Candidate Information',
    example: [candidateExample],
  })
  candidateInformation?: CandidateResponse[];
}
