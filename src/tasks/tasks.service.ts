import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto, GetTaskDto, UpdateTaskDto } from './task.dto';
import { PG_MISSING_PRIMARY_KEY_ERROR_CODE } from '../shared/constants';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  public async readTask(userId: number, taskId: number): Promise<GetTaskDto> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId, ownerId: userId } });
    if (!task) {
      throw new NotFoundException(`No task exists with id [${taskId}] and ownerId [${userId}].`);
    }
    return task;
  }

  public async listTasksOfUser(userId: number): Promise<GetTaskDto[]> {
    return this.tasksRepository.find({ where: { ownerId: userId } });
  }

  public async createTask(userId: number, task: CreateTaskDto): Promise<GetTaskDto> {
    const taskData: Task = this.tasksRepository.create({
      ...task,
      ownerId: userId
    });
    try {
      return await this.tasksRepository.save(taskData);
    } catch (error: unknown) {
      Logger.error(JSON.stringify(error));
      if ((error as { code: string })?.code === PG_MISSING_PRIMARY_KEY_ERROR_CODE) {
        throw new BadRequestException(`No user exists with id [${userId}].`);
      } else {
        throw error;
      }
    }
  }

  public async updateTask(
    userId: number,
    taskId: number,
    task: UpdateTaskDto
  ): Promise<GetTaskDto> {
    await this.validateTaskBelongsToUser(userId, taskId);
    const taskData = this.tasksRepository.create({ ...task, id: taskId, ownerId: userId });
    return this.tasksRepository.save(taskData);
  }

  public async deleteTask(userId: number, taskId: number): Promise<void> {
    const { affected }: DeleteResult = await this.tasksRepository.delete({
      id: taskId,
      ownerId: userId
    });
    if (!affected) {
      throw new NotFoundException(`No task exists with id [${taskId}] and ownerId [${userId}].`);
    }
  }

  private async validateTaskBelongsToUser(userId: number, taskId: number): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id: taskId, ownerId: userId } });
    if (!task) {
      throw new ForbiddenException(`No task exists with id [${taskId}] and ownerId [${userId}].`);
    }
  }
}
