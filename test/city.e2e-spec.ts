import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import * as request from 'supertest';
import { model, Model, connect, connection, disconnect } from 'mongoose';
import 'dotenv/config';

import { AppModule } from '../src/app.module';
import { CityDto } from '../src/dtos/City.dto';

import { CityFactory } from '../src/factories/city.factory';
import { City, CitySchema } from '../src/models/city.model';

import { StateFactory } from '../src/factories/state.factory';
import { State, StateSchema } from '../src/models/state.model';

describe('City Module (e2e)', () => {
  let app: INestApplication;
  let cityModel: Model<City>;
  let stateModel: Model<State>;

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
    stateModel = model('State', StateSchema);
    cityModel = model('City', CitySchema);

    await app.init();
  });

  describe('when it makes request to /api/cities (GET)', () => {
    let state: State;
    let cities: City[];
    let citiesDto: CityDto[];
    let response;

    beforeEach(async () => {
      const stateM = new stateModel(new StateFactory().make());
      state = await stateM.save();
      cities = [];
      for (let i = 0; i < 5; i++) {
        let city = new CityFactory().make();
        city.stateId = state.id;
        cities.push(city);
      }

      await cityModel.insertMany(cities);

      response = await request(app.getHttpServer()).get(`/api/cities?stateId=${state.id}`);
      citiesDto = response.body;
    });

    it('then it should response status 200', async () => {
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('then it should response stateDto[]', async () => {
      cities.sort((a, b) => a.id > b.id ? 1 : -1);
      citiesDto.sort((a, b) => a.id > b.id ? 1 : -1);

      for (let idx = 0; idx < citiesDto.length; idx++) {
        expect(citiesDto[idx].id).not.toBeNull();
        expect(cities[idx].name).toEqual(citiesDto[idx].name);
      }
    });
  });
});