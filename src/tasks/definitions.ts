import { IsDateString, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date_time: string;
}

export class GetTaskDto extends CreateTaskDto {
  id: number;
}
