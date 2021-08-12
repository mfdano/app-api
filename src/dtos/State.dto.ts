/**
 * 
 * StateDto defines the controller response object for State resource
 * 
 *
 *
 */
export class StateDto {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}