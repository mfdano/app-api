import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';

import { State } from '../models/state.model';

@Injectable()
export class StateService {
  constructor(@InjectModel('State') private stateModel: Model<State>) {}

  async create(name: string, countryId: string): Promise<State> {
    const state = new this.stateModel({ name: name, countryId: countryId });
    return await state.save();
  }
 
  async findByCountry(countryId: string): Promise<State[]> {
    return this.stateModel.find({ countryId: countryId}).exec();
  }
}
