
import {Task} from '../domain/models/task.model';
import { MongoTasksRepository } from '../infrastructure/mongo/mongo-tasks.repository';
import { SaveTaskTUseCase } from '../application/usecases/save-task.usecase';
import { TASK_EXAMPLE } from './task.object-mother';
import { GetTaskUseCase } from '../application/usecases/get-task.usecase';

describe('Get Task', () => {
    it('Should get a task', async () => {
        const input = '57c972f6-0678-4ffa-b7a3-f56b3a0fac3c';
        const taskRepository= new MongoTasksRepository();
        const getTask = jest.spyOn(taskRepository, 'getTaskById').mockImplementation(async (taskId: string) => TASK_EXAMPLE);

        const getTaskByIdUseCase = new GetTaskUseCase(taskRepository);
        const task = await getTaskByIdUseCase.execute(input);

        expect(getTask).toHaveBeenCalled();
        expect(task).toBe(TASK_EXAMPLE)
        expect(task).toBeInstanceOf(Task);
        expect('57c972f6-0678-4ffa-b7a3-f56b3a0fac3c').toBe(TASK_EXAMPLE.getTaskId());
        getTask.mockRestore();

    });

    it('Should not get a task', async () => {
        const input = '57c972f6-0678-4ffa-b7a3-f56b3a0fac3fd';
        const taskRepository= new MongoTasksRepository();
        const getTask = jest.spyOn(taskRepository, 'getTaskById').mockImplementation(async () => undefined);

        const getTaskByIdUseCase = new GetTaskUseCase(taskRepository);
        const task = await getTaskByIdUseCase.execute(input);

        expect(getTask).toHaveBeenCalled();
        expect(task).toBe(undefined)
        getTask.mockRestore();
    });
});
