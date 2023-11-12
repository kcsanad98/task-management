import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from './definitions';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  date_time: string;

  @ApiProperty()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date_time?: string;

  @ApiProperty({ required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}

export class GetTaskDto extends CreateTaskDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  ownerId: number;
}
