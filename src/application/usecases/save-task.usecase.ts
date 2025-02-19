import { Task } from "../../domain/models/task.model";
import { TaskRepository } from "../../domain/repositories/task.repository";

export class SaveTaskTUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(path: string): Promise<Task | void> {
    const task = Task.create(path, "pending");
    return this.taskRepository.save(task);
  }
}
