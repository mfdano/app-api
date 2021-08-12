import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import * as request from 'supertest';
import { model, Model, connect, connection, disconnect } from 'mongoose';
import 'dotenv/config';

import { AppModule } from '../src/app.module';
import { StateDto } from '../src/dtos/State.dto';

import { StateFactory } from '../src/factories/state.factory';
import { State, StateSchema } from '../src/models/state.model';
import { CountryFactory } from '../src/factories/country.factory';
import { Country, CountrySchema } from '../src/models/country.model';

describe('State Module (e2e)', () => {
  let app: INestApplication;
  let stateModel: Model<State>;
  let countryModel: Model<Country>;

  beforeAll(async () => {
    await connect(process.env.MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await connection.db.dropDatabase();
  });

  afterAll(async () => {
    await app.close();
    await connection.db.dropDatabase();
    await disconnect();
  });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    countryModel = model('Country', CountrySchema);
    stateModel = model('State', StateSchema);

    await app.init();
  });

  describe('when it makes request to /api/states (GET)', () => {
    let country: Country;
    let states: State[];
    let statesDto: StateDto[];
    let response;

    beforeEach(async () => {
      const c = new countryModel(new CountryFactory().make());
      country = await c.save();
      states = [];
      for (let i = 0; i < 5; i++) {
        let state = new StateFactory().make();
        state.countryId = country.id;
        states.push(state);
      }

      await stateModel.insertMany(states);

      response = await request(app.getHttpServer()).get(`/api/states?countryId=${country.id}`);
      statesDto = response.body;
    });

    it('then it should response status 200', async () => {
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('then it should response stateDto[]', async () => {
      states.sort((a, b) => a.id > b.id ? 1 : -1);
      statesDto.sort((a, b) => a.id > b.id ? 1 : -1);

      for (let idx = 0; idx < statesDto.length; idx++) {
        expect(statesDto[idx].id).not.toBeNull();
        expect(states[idx].name).toEqual(statesDto[idx].name);
      }
    });
  });
});