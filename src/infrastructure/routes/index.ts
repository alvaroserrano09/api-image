import express from "express";

import { postTask, getTaskById } from "./task.routes";
const router = express.Router();
router.post("/tasks", postTask);
router.get("/tasks/:taskId", getTaskById);

export default router;
