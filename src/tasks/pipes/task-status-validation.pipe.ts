import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task.model';

export class taskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];
  transform(value: string): string {
    value = value.toUpperCase();
    if (!this.isTaskStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid statuts`);
    }
    return value;
  }
  private isTaskStatusValid(status: any): boolean {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
