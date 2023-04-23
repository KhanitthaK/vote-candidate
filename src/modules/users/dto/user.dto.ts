import { ApiProperty } from '@nestjs/swagger';
import { userExample } from '../examples/users.example';

export class UserResponse {
  @ApiProperty({
    description: 'User ID',
    example: userExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'Thai identity card number',
    example: userExample.identityCardNumber,
  })
  identityCardNumber: string;

  @ApiProperty({
    description: 'Thai name',
    example: userExample.name,
  })
  name: string;

  @ApiProperty({
    description: 'District ID',
    example: 1,
  })
  districtId: number;

  @ApiProperty({
    description: 'User created date',
    example: userExample.createdAt,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'User updated date',
    example: userExample.updatedAt,
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'User deleted date',
    example: userExample.deletedAt,
    required: false,
  })
  deletedAt?: Date;
}
