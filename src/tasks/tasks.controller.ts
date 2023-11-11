import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTaskDto, GetTaskDto } from './definitions';
import { TasksService } from './tasks.service';

@Controller('users/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  public async createTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() task: CreateTaskDto
  ): Promise<GetTaskDto> {
    return this.tasksService.createTask(userId, task);
  }

  @Get()
  public async listTasksOfUser(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<GetTaskDto[]> {
    return this.tasksService.listTasksOfUser(userId);
  }

  @Get(':taskId')
  public async readTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ): Promise<GetTaskDto> {
    return this.tasksService.readTask(userId, taskId);
  }

  @Put(':taskId')
  public async updateTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() task: Partial<CreateTaskDto>
  ): Promise<GetTaskDto> {
    return this.tasksService.updateTask(userId, taskId, task);
  }

  @Delete(':taskId')
  public async deleteTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ): Promise<void> {
    await this.tasksService.deleteTask(userId, taskId);
  }
}
