import { randomUUID } from "crypto";

export type Image = {
  resolution: number;
  path: string;
};

export type TaskType = {
  taskId: string;
  price: number;
  images: Image[];
  status: "pending" | "completed" | "failed";
  originalPath: string;
};
export class Task {
  private constructor(private task: TaskType) {}

  static create(
    path: string,
    status: "pending" | "completed" | "failed"
  ): Task {
    return new Task({
      price: Math.floor(Math.random() * 50),
      images: [{ resolution: 1080, path }],
      status: status,
      taskId: randomUUID(),
      originalPath: path,
    });
  }

  raw(): TaskType {
    return {
      price: this.task.price,
      images: this.task.images,
      status: this.task.status,
      taskId: this.task.taskId,
      originalPath: this.task.originalPath,
    };
  }

  static mapToDomain(taskDocument: any): Task {
    return new Task({
      taskId: taskDocument.taskId,
      status: taskDocument.status,
      images: taskDocument.images,
      price: taskDocument.price,
      originalPath: taskDocument.originalPath,
    });
  }

  getTask(): TaskType {
    return this.task;
  }

  getPrice(): number {
    return this.task.price;
  }

  getImages(): Image[] {
    return this.task.images;
  }

  getStatus(): string {
    return this.task.status;
  }

  getTaskId(): string {
    return this.task.taskId;
  }

  getOriginalPath(): string {
    return this.task.originalPath;
  }

  setImages(images: Image[]): void {
    this.task.images = images;
  }

  setStatus(status: "pending" | "completed" | "failed"): void {
    this.task.status = status;
  }
}
