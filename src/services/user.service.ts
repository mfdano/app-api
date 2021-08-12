import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../models/user.model';
import { UserDto } from '../dtos/User.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async create(userDto: UserDto): Promise<User> {
    const user = new this.userModel(userDto);
    return user.save();
  }
}
