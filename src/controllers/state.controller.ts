import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

import { StateService } from '../services/state.service';
import { StateDto } from '../dtos/State.dto';

/**
 * 
 * StateController defines the methods to handle http requests for State resource
 * 
 *
 *
 */
@Controller('api/states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  @ApiOperation({  description: 'Returns a list of states given the country id',})
  @ApiOkResponse({
    description: 'The states have been successfully fetched.',
    type: StateDto,
  })
  @ApiParam({ name: 'countryId', type: 'query', required: true })
  async getStates(@Query() query): Promise<StateDto[]> {
    const states = await this.stateService.findByCountry(query.countryId).then();
    return states.map(state => new StateDto(state.id, state.name));
  }
}
