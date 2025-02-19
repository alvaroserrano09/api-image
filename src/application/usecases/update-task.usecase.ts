import { TaskService } from "../../domain/services/task.service";
import { Task } from "../../domain/models/task.model";
import { TaskRepository } from "../../domain/repositories/task.repository";

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string, path: string): Promise<Task | void> {
    try {
      const taskService = new TaskService();
      const task = await this.taskRepository.getTaskById(taskId);
      if (!task) {
        throw new Error("Task not found");
      }
      const images = await taskService.processImage(path);

      if (images.length === 0) {
        task.setStatus("failed");
        await this.taskRepository.updateTask(taskId, task);
        return task;
      } else {
        task.setImages(images);
        task.setStatus("completed");
        await this.taskRepository.updateTask(taskId, task);
        return task;
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  }
}
