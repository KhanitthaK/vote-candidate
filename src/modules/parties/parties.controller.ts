import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartiesDataAccessService } from 'src/core/prisma/services';
import { PartyResponse } from './dto/party.dto';

@ApiTags('Party')
@Controller('parties')
export class PartiesController {
  constructor(private readonly partiesDataAccessService: PartiesDataAccessService) {}
  @Get('')
  @ApiOperation({
    summary: 'List Party',
  })
  @ApiOkResponse({
    description: 'List Party',
    type: [PartyResponse],
  })
  list() {
    return this.partiesDataAccessService.findMany();
  }
}
