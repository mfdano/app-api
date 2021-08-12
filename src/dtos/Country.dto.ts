/**
 * 
 * CountryDto defines the controller response object for Country resource
 * 
 *
 *
 */
export class CountryDto {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}