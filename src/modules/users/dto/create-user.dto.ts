import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString, IsString, Length } from 'class-validator';

export class CreateUserRequest {
  @ApiProperty({
    description: 'Thai identity card number',
    example: '00000000000012',
  })
  @Length(13)
  @IsNumberString()
  identityCardNumber: string;

  @ApiProperty({
    description: 'Thai name',
    example: 'test name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'District ID',
    example: 1,
  })
  @IsNumber()
  districtId: number;
}
