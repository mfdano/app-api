import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';

import * as request from 'supertest';
import { model, Model, connect, connection, disconnect } from 'mongoose';
import 'dotenv/config';

import { AppModule } from '../src/app.module';
import { UserDto } from '../src/dtos/User.dto';
import { UserFactory } from '../src/factories/user.factory';
import { User, UserSchema } from '../src/models/user.model';
import { GetUserDto } from '../src/dtos/GetUser.dto';

describe('User Controller (e2e)', () => {
  let app: INestApplication;
  let userModel: Model<User>;

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
    userModel = model('User', UserSchema);

    await app.init();
  });

  describe('when it makes request to /api/users (POST)', () => {
    let user: User;
    let userDto: UserDto;
    let responseUser: GetUserDto;
    let response;

    beforeEach(async () => {
      user = new UserFactory().make();
      userDto = {
        name: user.name,
        age: user.age,
        cityId: user.cityId
      }

      response = await request(app.getHttpServer()).post('/api/users').send(userDto);
      responseUser = response.body;
    });

    it('then it should response status 201', async () => {
      expect(response.status).toBe(HttpStatus.CREATED);
    });

    it('then it should response GetUserDto', async () => {
      expect(responseUser).toMatchObject(response.body);
    });

    it('then it should persist to DB the given user', async () => {
      const userInDB: User = await userModel.findById(responseUser.id).exec();

      expect(userInDB.id).not.toBeNull();
      expect(userInDB.name).toEqual(user.name);
      expect(userInDB.age).toEqual(user.age);
      expect(userInDB.cityId.toString()).toEqual(user.cityId);
    });
  });
});