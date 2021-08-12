import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { StateController } from '../controllers/state.controller';
import { StateService } from '../services/state.service';
import { State } from '../models/state.model';
import { StateFactory } from '../factories/state.factory';
import { StateMockModel } from '../mock/state.mock.model';
import { StateDto } from '../dtos/State.dto';
import { Country } from '../models/country.model';
import { CountryFactory } from '../factories/country.factory';

describe('State Module', () => {
  let stateService: StateService;
  let stateController: StateController;
  let stateMockModel: StateMockModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StateController],
      providers: [
        StateService,
        { 
          provide: getModelToken('State'),
          useClass: StateMockModel
        }
      ],
    }).compile();

    stateController = moduleRef.get<StateController>(StateController);
    stateService = moduleRef.get<StateService>(StateService);
    stateMockModel = moduleRef.get<StateMockModel>(getModelToken('State'));
  });


  describe('when getStates is called', () => {
    let country: Country;
    let states: State[] = [];
    let statesDto: StateDto[];

    beforeEach(async () => {
      country = new CountryFactory().make();
      for (let i = 0; i < 5; i++) {
        let state = new StateFactory().make();
        state.countryId = country.id;
        states.push(state);
      }

      jest.spyOn(stateService, 'findByCountry').mockResolvedValue(states);

      statesDto = await stateController.getStates(country.id);
      states = await stateService.findByCountry(country.id);
    })

    it('then it should call stateService findByCountry', () => {
      expect(stateService.findByCountry).toHaveBeenCalledWith(country.id);
    })
    
    it('then it should return states', () => {
      for (let statedto of statesDto) {
        expect(statedto).toBeInstanceOf(StateDto);
      }
    })
  })

  describe('when create is called', () => {
    let state: State;
    let country: Country;
    let savedState: State;

    beforeEach(async () => {
      state = new StateFactory().make();
      country = new CountryFactory().make();
      state.countryId = country.id;
     
      jest.spyOn(StateMockModel.prototype, 'save').mockResolvedValue(state);
      jest.spyOn(stateService, 'create').mockResolvedValue(state);

      state = await stateService.create(state.name, state.countryId);
      savedState = await stateMockModel.save();
    })

    it('then it should call stateService create', () => {
      expect(stateService.create).toHaveBeenCalledWith(state.name, state.countryId);
    })

    it('then it should call state model save', () => {
      expect(jest.spyOn(StateMockModel.prototype, 'save')).toHaveBeenCalled();
    })
    
    it('then it should return country model', () => {
      expect(state).toEqual(savedState);
    })
  })

});