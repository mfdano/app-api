import { City } from "../models/city.model"
import { MockModel } from "./model.mock"

/**
 * 
 * CityMockModel defines mock class for City Model
 *
 */
export class CityMockModel extends MockModel<City> {
  protected model = {} as City;
}