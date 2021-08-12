/**
 * 
 * CityDto defines the controller response object for City resource
 * 
 *
 *
 */
export class CityDto {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}