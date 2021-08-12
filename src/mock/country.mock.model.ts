import { Country } from "../models/country.model"
import { MockModel } from "./model.mock"

/**
 * 
 * CountryMockModel defines mock class for Country Model
 *
 */
export class CountryMockModel extends MockModel<Country> {
  protected model = {} as Country;
}