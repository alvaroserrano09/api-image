import { Task } from "../domain/models/task.model";
import { MongoTasksRepository } from "../infrastructure/mongo/mongo-tasks.repository";
import { SaveTaskTUseCase } from "../application/usecases/save-task.usecase";
import { TASK_EXAMPLE } from "./task.object-mother";

describe("Create Task", () => {
  it("Should create a task", async () => {
    const input =
      "/output/image1/1024/f322b730b2322387da77e1c519c7ffef4fc2.jpg";
    const taskRepository = new MongoTasksRepository();
    const createTaskSpy = jest
      .spyOn(taskRepository, "save")
      .mockImplementation(async (task: Task) => TASK_EXAMPLE);

    const saveTaskTUseCase = new SaveTaskTUseCase(taskRepository);
    const task = await saveTaskTUseCase.execute(input);

    expect(createTaskSpy).toHaveBeenCalled();
    expect(task).toBe(TASK_EXAMPLE);
    expect(task).toBeInstanceOf(Task);
    expect("asdasfsdasda").not.toBe(TASK_EXAMPLE.getTaskId());
    createTaskSpy.mockRestore();
  });
});
