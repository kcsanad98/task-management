import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;
}

export class GetUserDto extends CreateUserDto {
  id: number;
}
