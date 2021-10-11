import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly username: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly password: string;
}
