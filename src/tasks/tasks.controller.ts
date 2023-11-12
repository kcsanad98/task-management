import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from './task.dto';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('users/:userId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Create task' })
  @Post()
  public async createTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() task: CreateTaskDto
  ): Promise<GetTaskDto> {
    return this.tasksService.createTask(userId, task);
  }

  @ApiOperation({ summary: 'List tasks of user' })
  @Get()
  public async listTasksOfUser(
    @Param('userId', ParseIntPipe) userId: number
  ): Promise<GetTaskDto[]> {
    return this.tasksService.listTasksOfUser(userId);
  }

  @ApiOperation({ summary: 'Read task' })
  @Get(':taskId')
  public async readTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ): Promise<GetTaskDto> {
    return this.tasksService.readTask(userId, taskId);
  }

  @ApiOperation({ summary: 'Update task' })
  @Put(':taskId')
  public async updateTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() task: UpdateTaskDto
  ): Promise<GetTaskDto> {
    return this.tasksService.updateTask(userId, taskId, task);
  }

  @ApiOperation({ summary: 'Delete task' })
  @Delete(':taskId')
  public async deleteTask(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('taskId', ParseIntPipe) taskId: number
  ): Promise<void> {
    await this.tasksService.deleteTask(userId, taskId);
  }
}
