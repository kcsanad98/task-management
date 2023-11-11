export class CreateTaskDto {
  name: string;
  description: string;
  date_time: string;
}

export class GetTaskDto extends CreateTaskDto {
  id: number;
}
