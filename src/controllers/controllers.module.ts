import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersModule } from 'src/users';
import { TasksController } from './tasks.controller';

@Module({
  imports: [UsersModule],
  controllers: [UsersController, TasksController]
})
export class ControllersModule {}
