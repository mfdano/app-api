import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { City } from '../models/city.model';

@Injectable()
export class CityService {
  constructor(@InjectModel('City') private cityModel: Model<City>) {}

  async create(name: string, stateId: string): Promise<City> {
    const city = new this.cityModel({ name: name, stateId: stateId });
    return await city.save();
  }
 
  async findByState(stateId: string): Promise<City[]> {
    return this.cityModel.find({ stateId: stateId }).exec();
  }
}
