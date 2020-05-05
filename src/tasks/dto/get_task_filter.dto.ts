import { TaskStatus } from '../task.model';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTaskFilterDTO {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;
  @IsOptional()
  @IsNotEmpty()
  search: string;
}
