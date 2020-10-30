import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { Task } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        return Object.keys(filterDto).length
            ? this.tasksService.getTasksWithFilters(filterDto)
            : this.tasksService.getAllTasks()
    }

    @Get(':id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch(':id/:property')
    updateTask(
        @Param('id') id: string,
        @Param('property') property: string,
        @Body() body
    ) {
        const newValue = body[property]
        return this.tasksService.updateTask(id, property, newValue)
    }

    @Delete(':id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id)
    }
}
