import { Task } from "../../domain/models/task.model";
import { TaskRepository } from "../../domain/repositories/task.repository";

export class GetTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<Task | void> {
    return this.taskRepository.getTaskById(taskId);
  }
}
