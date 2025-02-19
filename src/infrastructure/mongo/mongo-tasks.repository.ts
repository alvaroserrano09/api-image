import { TaskRepository } from "../../domain/repositories/task.repository";
import { TaskModel } from "./task.model";
import { Task } from "../../domain/models/task.model";

export class MongoTasksRepository implements TaskRepository {
    async save(task: Task): Promise<Task | void> {
       try{
        const taskModel = new TaskModel(task.raw());
        const taskSaved =await taskModel.save();

        return Task.mapToDomain(taskSaved);
       }
       catch(error){
        console.error('Error while creating the Task:', error);
        throw error;
    }
    }

    async getTaskById(taskId: string): Promise<Task | void> {
        try{
            const task = await TaskModel.findOne({ taskId });
            console.log('task', task);
            if (!task) {
                return ;
        }
     
            return Task.mapToDomain(task);
        
    }
        catch(error){
            console.error('Error while getting the Task:', error);
        }
    } 

    async updateTask(taskId: string, task: Task): Promise<Task | void> {
        try{
            const taskUpdated = await TaskModel.findOneAndUpdate
            ({ taskId }, task.raw(), { new: true });
            if (!taskUpdated) {
                return ;
            }
            return Task.mapToDomain(taskUpdated);
        }
        catch(error){
            console.error('Error while updating the Task:', error);
        }
    }
}

