import { UpdateTaskUseCase } from "../application/usecases/update-task.usecase";
import { Task } from "../domain/models/task.model";
import { MongoTasksRepository } from "../infrastructure/mongo/mongo-tasks.repository";
import { TASK_EXAMPLE } from "./task.object-mother";
import { TaskService } from "../domain/services/task.service";

describe("updateTask", () => {
  it("should update the task with new data", async () => {
    const input = "57c972f6-0678-4ffa-b7a3-f56b3a0fac3c";
    const inputPath = "./input/imagen.jpg";
    const taskRepository = new MongoTasksRepository();
    const taskService = new TaskService();
    jest
      .spyOn(taskService, "processImage")
      .mockImplementation(async (path: string) => [
        {
          resolution: 100,
          path: "/output/image1/1024/f322b730b2322387da77e1c519c7ffef4fc2.jpg",
        },
      ]);
    const getTask = jest
      .spyOn(taskRepository, "getTaskById")
      .mockImplementation(async (taskId: string) => TASK_EXAMPLE);
    const updateTask = jest
      .spyOn(taskRepository, "updateTask")
      .mockImplementation(async (taskId: string, task: Task) => TASK_EXAMPLE);

    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    const task = await updateTaskUseCase.execute(input, inputPath);

    expect(updateTask).toHaveBeenCalled();
    expect(getTask).toHaveBeenCalled();
    expect(task).toBe(TASK_EXAMPLE);
    expect(task).toBeInstanceOf(Task);
  });
});
