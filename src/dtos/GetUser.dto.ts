/**
 * 
 * GetUserDto defines the controller response object for User resource
 * 
 *
 *
 */
export class GetUserDto {
  id: string;
  name: string;
  age: number;
  cityId: string;

  constructor(id: string, name: string, age: number, cityId: string) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.cityId = cityId;
  }
}