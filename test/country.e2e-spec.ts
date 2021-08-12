import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import * as request from 'supertest';
import { model, Model, connect, connection, disconnect } from 'mongoose';
import 'dotenv/config';

import { AppModule } from '../src/app.module';
import { CountryDto } from '../src/dtos/Country.dto';
import { CountryFactory } from '../src/factories/country.factory';
import { Country, CountrySchema } from '../src/models/country.model';

describe('Country Controller (e2e)', () => {
  let app: INestApplication;
  let countryModel: Model<Country>;

  beforeAll(async () => {
    await connect(process.env.MONGO_TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true  });
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

    await app.init();
  });

  describe('when it makes request to /api/countries (GET)', () => {
    let countries: Country[] = [];
    let countriesDto: CountryDto[];
    let response;

    beforeEach(async () => {
      for (let i = 0; i < 5; i++) {
        countries.push(new CountryFactory().make());
      }

      await countryModel.deleteMany();
      await countryModel.insertMany(countries);
      response = await request(app.getHttpServer()).get('/api/countries');
      countriesDto = response.body;
    });

    it('then it should response status 200', async () => {
      expect(response.status).toBe(HttpStatus.OK);
    });

    it('then it should response countryDto[]', async () => {
      countries.sort((a, b) => a.id > b.id ? 1 : -1);
      countriesDto.sort((a, b) => a.id > b.id ? 1 : -1);

      for (let idx = 0; idx < countriesDto.length; idx++) {
        expect(countriesDto[idx].id).not.toBeNull();
        expect(countries[idx].name).toEqual(countriesDto[idx].name);
      }
    });
  });
});