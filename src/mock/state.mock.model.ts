import { State } from "../models/state.model"
import { MockModel } from "./model.mock"

/**
 * 
 * StateMockModel defines mock class for State Model
 *
 */
export class StateMockModel extends MockModel<State> {
  protected model = {} as State;
}