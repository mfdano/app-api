import { SchemaTypes, Schema } from 'mongoose';

/**
 * 
 * UserSchema defines mongoose schema for persist User
 *
 */
export const UserSchema = new Schema({
  name: String,
  age: Number,
  cityId: { type: SchemaTypes.ObjectId, ref: 'City' }
});

/**
 * 
 * User defines contract document for User
 *
 */
export interface User {
  id: string;
  name: string;
  age: number;
  cityId: string;
}