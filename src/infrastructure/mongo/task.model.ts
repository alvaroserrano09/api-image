import { Schema, model } from "mongoose";

const tasks = new Schema(
  {
    taskId: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    images: [{ resolution: Number, path: String }],
    status: { type: String, required: true },
    originalPath: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const TaskModel = model("tasks", tasks);
