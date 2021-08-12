import { User } from "../models/user.model"
import { MockModel } from "./model.mock"

/**
 * 
 * UserMockModel defines mock class for User Model
 *
 */
export class UserMockModel extends MockModel<User> {
  protected model = {} as User;
}