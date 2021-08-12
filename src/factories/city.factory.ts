import * as Faker from 'faker';
import { Types } from 'mongoose';
import { City } from 'src/models/city.model';

/**
 * 
 * CityFactory defines a factory to create City objects
 * 
 *
 *
 */
export class CityFactory {
  id: string;
  name: string;
  stateId: string;

  constructor() {
    Faker.locale = 'es_MX';

    this.id = Types.ObjectId().toString();
    this.name = Faker.address.country();
    this.stateId = Types.ObjectId().toString();
  }

  make(): City {
    return {
      id: this.id,
      name: this.name,
      stateId: this.stateId
    } as City
  }
}
