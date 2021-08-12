import { SchemaTypes, Schema } from 'mongoose';

/**
 * 
 * StateSchema defines mongoose schema for persist State
 *
 */
export const StateSchema = new Schema({
  name: String,
  countryId: { type: SchemaTypes.ObjectId, ref: 'Country' }
});

/**
 * 
 * State defines contract document for State
 *
 */
export interface State {
  id: string;
  name: string;
  countryId: string;
}