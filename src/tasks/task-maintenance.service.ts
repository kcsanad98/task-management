import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Interval } from '@nestjs/schedule';
import { TaskStatus } from './definitions';

const DELETE_EXPIRED_TASKS_INTERVAL = 60 * 1000;

@Injectable()
export class TaskMaintenanceService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>
  ) {}

  @Interval(DELETE_EXPIRED_TASKS_INTERVAL)
  public async deleteExpiredTasks(): Promise<void> {
    const currentDate = new Date();
    const { affected } = await this.tasksRepository
      .createQueryBuilder('task')
      .delete()
      .where('task.status = :pendingStatus AND task.date_time < :currentDate', {
        pendingStatus: TaskStatus.PENDING,
        currentDate
      })
      .execute();
    Logger.log(
      `Scheduled job deleted ${affected ? affected : 0} records from the task table.`,
      this.constructor.name
    );
  }
}
