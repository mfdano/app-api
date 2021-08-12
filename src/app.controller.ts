import { Controller, Get } from '@nestjs/common';

import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';
import { CityService } from './services/city.service';


@Controller('load')
export class AppController {
  constructor(
    private readonly countryService: CountryService,
    private readonly stateService: StateService,
    private readonly cityService: CityService) {}
    
  @Get()
  async loadData() {
    const countries = [{
      name: 'México',
      states: [
        {
          name : 'Chihuahua', 
          cities: [
            { name: 'Juárez'},
            { name: 'Chihuahua'}
          ]
        },
        {
          name : 'Nayarit', 
          cities: [
            { name: 'La palma'},
            { name: 'Tepic'}
          ]
        }
      ]
    },
    {
      name: 'Estados Unidos',
      states: [
        {
          name : 'Ohio', 
          cities: [
            { name: 'Columbus'},
            { name: 'Springfield'}
          ]
        },
        {
          name : 'Texas', 
          cities: [
            { name: 'San Antonio'},
            { name: 'Austin'}
          ]
        }
      ]
    },
    {
      name: 'Canadá',
      states: [
        {
          name : 'Manitoba', 
          cities: [
            { name: 'Winnipeg'},
            { name: 'Winkler'}
          ]
        },
        {
          name : 'Alberta', 
          cities: [
            { name: 'Lacombe'},
            { name: 'Calgary'}
          ]
        }
      ]
    }];

    try {
      for (let country of countries) {
        const _country = await this.countryService.create(country.name).then();
        for (let state of country.states) {
          const _state = await this.stateService.create(state.name, _country.id);
          for (let city of state.cities) {
            await this.cityService.create(city.name, _state.id);
          }
        }
      }

      return { message: 'Datos cargardos correctamente' };
    } catch (e) {
      console.log('ERROR AT SAVING DATA');
      console.log(JSON.stringify(e, null, 2));
    }
  }
}
