import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Country } from '../models/country.model';

@Injectable()
export class CountryService {
  constructor(@InjectModel('Country') private countryModel: Model<Country>) {}

  async create(name: string): Promise<Country> {
    const country = new this.countryModel({ name: name });
    return country.save();
  }
 
  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }
}
