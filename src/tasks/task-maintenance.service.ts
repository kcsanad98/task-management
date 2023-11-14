import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Interval } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './definitions';
import { ConfigService } from '@nestjs/config';

const DELETE_EXPIRED_TASKS_INTERVAL = 60 * 1000;

@Injectable()
export class TaskMaintenanceService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly configService: ConfigService
  ) {}

  @Interval(DELETE_EXPIRED_TASKS_INTERVAL)
  public async deleteExpiredTasks(): Promise<void> {
    if (this.configService.get('API_DISABLE_SCHEDULED_TASK_REMOVAL') === 'true') {
      return;
    }

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
