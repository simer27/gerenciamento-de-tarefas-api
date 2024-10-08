import {
  HttpStatus,
  Injectable,
  NotFoundException,
  HttpException,
  Delete,
  Param,
} from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];

  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `O id ${id}, não foi encontrado na base de dados.`,
      HttpStatus.NOT_FOUND,
    );
  }

  update(task: TaskDto) {
    let taskIndex = this.tasks.findIndex((t) => t.id === task.id);

    if (taskIndex >= 0) {
      this.tasks[taskIndex] = task;
      return;
    }

    throw new HttpException(
      `O id ${task.id}, não foi encontrado na base de dados.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1);
      return;
    }

    throw new HttpException(
      `O id ${id}, não foi encontrado na base de dados.`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
