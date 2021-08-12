import { ApiProperty } from '@nestjs/swagger';
/**
 * 
 * UserDto defines the controller request object for User resource
 * 
 *
 *
 */
export class UserDto {
  @ApiProperty({required: true, description: 'The name of the user'})
  name: string;

  @ApiProperty({required: true, description: 'The user age'})
  age: number;

  @ApiProperty({required: true, description: 'The cityId of the user'})
  cityId: string;
}