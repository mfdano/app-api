import * as Faker from 'faker';
import { Types } from 'mongoose';
import { Country } from 'src/models/country.model';

/**
 * 
 * CountryFactory defines a factory to create Country objects
 * 
 *
 *
 */
export class CountryFactory {
  id: string;
  name: string;

  constructor() {
    Faker.locale = 'es_MX';

    this.id = Types.ObjectId().toString();
    this.name = Faker.address.country();
  }

  make(): Country {
    return {
      id: this.id,
      name: this.name
    } as Country
  }
}
