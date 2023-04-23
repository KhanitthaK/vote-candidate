import { ApiProperty } from '@nestjs/swagger';

export class PageInfo {
  @ApiProperty({
    description: 'Total Items',
    required: true,
    example: 1,
  })
  totalCount: number;

  @ApiProperty({
    description: 'Offset',
    required: false,
    example: 0,
  })
  offset?: number;

  @ApiProperty({
    description: 'Limit',
    required: false,
    example: 10,
  })
  limit?: number;
}
