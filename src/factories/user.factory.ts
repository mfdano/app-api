import * as Faker from 'faker';
import { Types } from 'mongoose';
import { User } from 'src/models/user.model';

/**
 * 
 * UserFactory defines a factory to create User objects
 * 
 *
 *
 */
export class UserFactory {
  id: string;
  name: string;
  age: number;
  cityId: string;

  constructor() { Faker.locale = 'es_MX'; }

  make(): User {
    return {
      id: Types.ObjectId().toString(),
      name: Faker.name.findName(),
      age: Faker.datatype.number({ max: 99, min: 18 }),
      cityId: Types.ObjectId().toString(),
    } as User
  }
}
