import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { CountryController } from '../controllers/country.controller';
import { CountryService } from '../services/country.service';

import { Country } from '../models/country.model';
import { CountryFactory } from '../factories/country.factory';
import { CountryMockModel } from '../mock/country.mock.model';
import { CountryDto } from '../dtos/Country.dto';

describe('Country Module', () => {
  let countryService: CountryService;
  let countryController: CountryController;
  let countryMockModel: CountryMockModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CountryController],
      providers: [
        CountryService,
        { 
          provide: getModelToken('Country'),
          useClass: CountryMockModel
        }
      ],
    }).compile();

    countryController = moduleRef.get<CountryController>(CountryController);
    countryService = moduleRef.get<CountryService>(CountryService);
    countryMockModel = moduleRef.get<CountryMockModel>(getModelToken('Country'));
  });


  describe('when getCountries is called', () => {
    let countries: Country[] = [];
    let countriesDto: CountryDto[];

    beforeEach(async () => {
      for (let i = 0; i < 5; i++) { countries.push(new CountryFactory().make()); }
      jest.spyOn(countryService, 'findAll').mockResolvedValue(countries);

      countriesDto = await countryController.getCountries();
      countries = await countryService.findAll();
    })

    it('then it should call countryService findAll', () => {
      expect(countryService.findAll).toHaveBeenCalled();
    })
    
    it('then it should return countries', () => {
      expect(countriesDto).toEqual(countries);
      for (let countryDto of countriesDto) {
        expect(countryDto).toBeInstanceOf(CountryDto);
      }
    })
  })

  describe('when create is called', () => {
    let country: Country;
    let savedCountry: Country;

    beforeEach(async () => {
      country = new CountryFactory().make();
     
      jest.spyOn(CountryMockModel.prototype, 'save').mockResolvedValue(country);
      jest.spyOn(countryService, 'create').mockResolvedValue(country);

      country = await countryService.create(country.name);
      savedCountry = await countryMockModel.save();
    })

    it('then it should call countryService create', () => {
      expect(countryService.create).toHaveBeenCalledWith(country.name);
    })

    it('then it should call country model save', () => {
      expect(jest.spyOn(CountryMockModel.prototype, 'save')).toHaveBeenCalled();
    })
    
    it('then it should return country model', () => {
      expect(country).toEqual(savedCountry);
    })
  })

});