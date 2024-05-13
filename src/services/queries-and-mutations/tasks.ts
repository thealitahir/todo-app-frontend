import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addNewTask, browseTasks, updateTask } from '../api/tasks';
import { Task } from '../utils/interface';

export function useTasks() {
	return useQuery<Task[], Error>('Tasks', browseTasks, {
		refetchOnWindowFocus: false,
	});
}

export function useUpsertTask() {
	const queryClient = useQueryClient();

	return useMutation<Task, Error, Task>(
		(data: Task) => (data.id ? updateTask(data) : addNewTask(data)),
		{
			onSuccess: (data) => {
				queryClient.setQueryData<Task[]>('Tasks', (old) => setTasks(old, data));
			},
		}
	);
}

export function setTasks(tasks: Task[] | undefined, task: Task) {
	tasks = [...(tasks ?? [])];
	const index = tasks?.findIndex((c) => c.id === task.id) ?? -1;
	if (index !== -1) {
		tasks![index] = task;
	} else {
		if (tasks) {
			tasks.unshift(task);
		} else {
			tasks = [task];
		}
	}
	return tasks ?? [];
}
