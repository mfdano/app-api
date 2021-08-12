import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';

import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { UserFactory } from '../factories/user.factory';
import { UserMockModel } from '../mock/user.mock.model';
import { UserDto } from '../dtos/User.dto';

import { City } from '../models/city.model';
import { CityFactory } from '../factories/city.factory';
import { GetUserDto } from 'src/dtos/GetUser.dto';

describe('User Module', () => {
  let userService: UserService;
  let userController: UserController;
  let userMockModel: UserMockModel;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { 
          provide: getModelToken('User'),
          useClass: UserMockModel
        }
      ],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
    userService = moduleRef.get<UserService>(UserService);
    userMockModel = moduleRef.get<UserMockModel>(getModelToken('User'));
  });

  describe('when create is called', () => {
    let user: User;
    let userDto: UserDto;
    let getUserDto: GetUserDto;
    let city: City;
    let savedUser: User;

    beforeEach(async () => {
      user = new UserFactory().make();
      city = new CityFactory().make();
      user.cityId = city.id;
      userDto = user;
     
      jest.spyOn(UserMockModel.prototype, 'save').mockResolvedValue(user);
      jest.spyOn(userService, 'create').mockResolvedValue(user);

      getUserDto = await userController.postUser(userDto);
      user = await userService.create(userDto);
      savedUser = await userMockModel.save();
    })

    it('then it should call userService create', () => {
      expect(userService.create).toHaveBeenCalledWith(userDto);
    })

    it('then it should call user model save', () => {
      expect(jest.spyOn(UserMockModel.prototype, 'save')).toHaveBeenCalled();
    })
    
    it('then it should return user', () => {
      expect(user).toEqual(savedUser);
    })
  })

});