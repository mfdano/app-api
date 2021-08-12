import { Schema } from 'mongoose';

/**
 * 
 * CountrySchema defines mongoose schema for persist Country
 *
 */
export const CountrySchema = new Schema({
  name: String
});

/**
 * 
 * Country defines contract document for Country
 *
 */
export interface Country {
  id: string;
  name: string;
}