import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

import { CityService } from '../services/city.service';
import { CityDto } from '../dtos/City.dto';

/**
 * 
 * CityController defines the methods to handle http requests for City resource
 * 
 *
 *
 */
@Controller('api/cities')
export class CityController {
  constructor(
    private readonly cityService: CityService) {}

  @Get()
  @ApiOperation({ description: 'Returns a list of cities given the state id',})
  @ApiOkResponse({
    description: 'The cities have been successfully fetched.',
    type: CityDto,
  })
  @ApiParam({ name: 'stateId', type: 'query', required: true })
  async getCities(@Query() query): Promise<CityDto[]> {
    const cities = await this.cityService.findByState(query.stateId).then();
    return cities.map(city => new CityDto(city.id, city.name));
  }
}
