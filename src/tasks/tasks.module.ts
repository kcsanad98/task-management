import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskMaintenanceService } from './task-maintenance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TaskMaintenanceService],
  controllers: [TasksController]
})
export class TasksModule {}
