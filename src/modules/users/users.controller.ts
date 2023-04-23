import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersDataAccessService } from 'src/core/prisma/services';
import { CreateUserRequest, UserResponse } from './dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersDataAccessService: UsersDataAccessService) {}
  @Get(':districtId')
  @ApiOperation({
    summary: 'List User',
  })
  @ApiOkResponse({
    description: 'List User',
    type: [UserResponse],
  })
  list(@Param('districtId') districtId?: string) {
    return this.usersDataAccessService.findMany({
      where: { districtId: Number(districtId) },
    });
  }

  @Post()
  @ApiOperation({
    summary: 'Create User',
  })
  @ApiOkResponse({
    description: 'Create User',
    type: UserResponse,
  })
  create(@Body() request: CreateUserRequest) {
    return this.usersDataAccessService.create(request);
  }
}
