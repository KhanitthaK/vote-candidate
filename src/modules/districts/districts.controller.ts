import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DistrictDataAccessService } from 'src/core/prisma/services';
import { DistrictResponse } from './dto';

@ApiTags('District')
@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsDataAccessService: DistrictDataAccessService) {}
  @Get('')
  @ApiOperation({
    summary: 'List District',
  })
  @ApiOkResponse({
    description: 'List District',
    type: [DistrictResponse],
  })
  list() {
    return this.districtsDataAccessService.findMany();
  }
}
