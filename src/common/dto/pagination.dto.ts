import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min, ValidateIf } from 'class-validator';

export class Pagination {
  @ApiProperty({
    example: 0,
    description: 'Offset',
    required: false,
  })
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  @Min(0)
  offset?: number;

  @ApiProperty({
    example: 1,
    description: 'Limit',
    required: false,
  })
  @IsNotEmpty()
  @ValidateIf((_, value) => value !== undefined)
  @IsInt()
  @Min(1)
  limit?: number;
}
