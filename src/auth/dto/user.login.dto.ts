import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ example: 'test_user', description: 'The username of the user' })
  name: string;
  @ApiProperty({ example: "test", description: 'The password of the user' })
  password: string;
}
