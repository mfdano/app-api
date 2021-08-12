import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/User.dto';
import { GetUserDto } from '../dtos/GetUser.dto';


/**
 * 
 * User Controller defines the methods to handle http requests for User resource
 * 
 *
 *
 */
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({  description: 'Register a new user',})
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: GetUserDto,
  })
  async postUser(@Body() createUserDto: UserDto): Promise<GetUserDto> {
    const user = await this.userService.create(createUserDto).then();
    return new GetUserDto(user.id, user.name, user.age, user.cityId);
  }
}
