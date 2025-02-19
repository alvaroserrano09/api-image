import { Response, Request } from "express";
import { SaveTaskTUseCase } from "../../application/usecases/save-task.usecase";
import { MongoTasksRepository } from "../mongo/mongo-tasks.repository";
import { GetTaskUseCase } from "../../application/usecases/get-task.usecase";
import { UpdateTaskUseCase } from "../../application/usecases/update-task.usecase";

export const postTask = async (req: Request, res: Response) => {
  try {
    const path = req.body.path;
    const saveTaskTUseCase = new SaveTaskTUseCase(new MongoTasksRepository());
    const updateTaskUseCase = new UpdateTaskUseCase(new MongoTasksRepository());
    const taskCreated = await saveTaskTUseCase.execute(path);

    if (!taskCreated) {
      res.status(404).send({ error: "Task not found" });
    } else {
      res.status(201).json({
        taskId: taskCreated.getTaskId(),
        price: taskCreated.getPrice(),
        status: taskCreated.getStatus(),
      });

      await updateTaskUseCase.execute(taskCreated.getTaskId(), path);
    }
  } catch (error) {
    console.error("Error while creating the task:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.taskId;
    const getTaskByIdUseCase = new GetTaskUseCase(new MongoTasksRepository());
    const task = await getTaskByIdUseCase.execute(taskId);

    if (!task) {
      res.status(404).send("Task not found");
    } else {
      if (task.getStatus() === "failed" || task.getStatus() === "pending") {
        res.status(200).json({
          taskId: task.getTaskId(),
          price: task.getPrice(),
          status: task.getStatus(),
        });
      } else {
        res.status(200).json({
          taskId: task.getTaskId(),
          price: task.getPrice(),
          status: task.getStatus(),
          images: task.getImages(),
        });
      }
    }
  } catch (error) {
    console.error("Error while getting the task:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
