import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { CityController } from '../controllers/city.controller';
import { CityService } from '../services/city.service';
import { City } from '../models/city.model';
import { CityFactory } from '../factories/city.factory';
import { CityMockModel } from '../mock/city.mock.model';
import { CityDto } from '../dtos/City.dto';

import { State } from '../models/state.model';
import { StateFactory } from '../factories/state.factory';

describe('City Module', () => {
  let cityService: CityService;
  let stateController: CityController;
  let cityMockModel: CityMockModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        CityService,
        { 
          provide: getModelToken('City'),
          useClass: CityMockModel
        }
      ],
    }).compile();

    stateController = moduleRef.get<CityController>(CityController);
    cityService = moduleRef.get<CityService>(CityService);
    cityMockModel = moduleRef.get<CityMockModel>(getModelToken('City'));
  });


  describe('when getCities is called', () => {
    let state: State;
    let cities: City[] = [];
    let citiesDto: CityDto[];

    beforeEach(async () => {
      state = new StateFactory().make();
      for (let i = 0; i < 5; i++) {
        let city = new CityFactory().make();
        city.stateId = state.id;
        cities.push(city);
      }

      jest.spyOn(cityService, 'findByState').mockResolvedValue(cities);

      citiesDto = await stateController.getCities(state.id);
      cities = await cityService.findByState(state.id);
    })

    it('then it should call cityService findByCountry', () => {
      expect(cityService.findByState).toHaveBeenCalledWith(state.id);
    })
    
    it('then it should return cities', () => {
      for (let statedto of citiesDto) {
        expect(statedto).toBeInstanceOf(CityDto);
      }
    })
  })

  describe('when create is called', () => {
    let city: City;
    let state: State;
    let savedState: City;

    beforeEach(async () => {
      city = new CityFactory().make();
      state = new StateFactory().make();
      city.stateId = state.id;
     
      jest.spyOn(CityMockModel.prototype, 'save').mockResolvedValue(city);
      jest.spyOn(cityService, 'create').mockResolvedValue(city);

      city = await cityService.create(city.name, city.stateId);
      savedState = await cityMockModel.save();
    })

    it('then it should call cityService create', () => {
      expect(cityService.create).toHaveBeenCalledWith(city.name, city.stateId);
    })

    it('then it should call city model save', () => {
      expect(jest.spyOn(CityMockModel.prototype, 'save')).toHaveBeenCalled();
    })
    
    it('then it should return state model', () => {
      expect(city).toEqual(savedState);
    })
  })

});