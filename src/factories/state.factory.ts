import * as Faker from 'faker';
import { Types } from 'mongoose';
import { State } from './../models/state.model';

/**
 * 
 * StateFactory defines a factory to create State objects
 *
 */
export class StateFactory {
  id: string;
  name: string;
  countryId: string;

  constructor() {
    Faker.locale = 'es_MX';

    this.id = Types.ObjectId().toString();
    this.name = Faker.address.country();
    this.countryId = Types.ObjectId().toString();;
  }

  make(): State {
    return {
      id: this.id,
      name: this.name,
      countryId: this.countryId
    } as State
  }
}
