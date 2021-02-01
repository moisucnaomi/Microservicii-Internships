import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty() 
  firstName: string;

  @ApiProperty() 
  lastName: string;

  @ApiProperty() 
  roleId: string;

  @ApiProperty() 
  company: string;
}