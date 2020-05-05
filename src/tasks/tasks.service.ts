import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create_task.dto';
import { GetTaskFilterDTO } from './dto/get_task_filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTaskWithFilters(filterDto: GetTaskFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (search) {
      tasks = tasks.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }
  getTask(id: string): Task {
    const found = this.tasks.find(task => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task With ID "${id}" not Found`);
    }

    return found;
  }

  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTask(id);
    task.status = status;
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTask(id);
    this.tasks = this.tasks.filter(task => task.id !== found.id);
  }
}
