import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { CountryService } from '../services/country.service';
import { CountryDto } from '../dtos/Country.dto';

/**
 * 
 * CountryController defines the methods to handle http requests for Country resource
 * 
 *
 *
 */
@Controller('api/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  @ApiOperation({  description: 'Returns a list of countries',})
  @ApiOkResponse({
    description: 'The countries have been successfully fetched.',
    type: CountryDto,
  })
  async getCountries(): Promise<CountryDto[]> {
    const countries = await this.countryService.findAll().then();
    return countries.map(country => new CountryDto(country.id, country.name));
  }
}
