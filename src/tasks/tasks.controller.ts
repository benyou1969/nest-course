import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create_task.dto';
import { GetTaskFilterDTO } from './dto/get_task_filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pip';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDTO): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilters(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @UsePipes(ValidationPipe)
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  // @Patch('/:id/:status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task {
  //   return this.tasksService.updateTaskStatus(id, status);
  // }

  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }
}
