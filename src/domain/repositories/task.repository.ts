import { Task } from '../models/task.model';

export interface TaskRepository {
    save(task: Task): Promise<Task | void>;
    getTaskById(taskId: string): Promise<Task | void>;
    updateTask(taskId: string, task: Task): Promise<Task | void>;
    }
