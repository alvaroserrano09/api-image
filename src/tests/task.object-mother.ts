import { Task } from "../domain/models/task.model";

export const TASK_EXAMPLE: Task = Task.mapToDomain({
  taskId: "57c972f6-0678-4ffa-b7a3-f56b3a0fac3c",
  price: 100,
  images: [
    {
      resolution: 100,
      path: "/output/image1/1024/f322b730b2322387da77e1c519c7ffef4fc2.jpg",
    },
  ],
  status: "pending",
  originalPath: "/output/image1/1024/f322b730b2322387da77e1c519c7ffef4fc2.jpg",
});
