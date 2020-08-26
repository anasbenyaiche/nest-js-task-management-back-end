import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto, GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { searchTerm, status } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter(task => task.status === status);
    }
    if (searchTerm) {
      tasks = tasks.filter(
        tasks =>
          tasks.title.includes(searchTerm) ||
          tasks.description.includes(searchTerm),
      );
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(tesk => tesk.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid.v4(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  updateTask(id: string, status: TaskStatus): Task {
    const task: Task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
