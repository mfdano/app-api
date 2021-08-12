import { SchemaTypes, Schema } from 'mongoose';

/**
 * 
 * CitySchema defines mongoose schema for persist City
 *
 */
export const CitySchema = new Schema({
  name: String,
  stateId: { type: SchemaTypes.ObjectId, ref: 'City' }
});

/**
 * 
 * City defines contract document for City
 *
 */
export interface City {
  id: string;
  name: string;
  stateId: string;
}