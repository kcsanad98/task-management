export class CreateUserDto {
  username: string;
  first_name: string;
  last_name: string;
}

export class GetUserDto extends CreateUserDto {
  id: number;
}
