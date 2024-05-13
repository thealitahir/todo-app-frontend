import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addNewTask, browseTasks, updateTask } from '../api/tasks';
import { Task } from '../utils/interface';
import { toast } from 'react-toastify';

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
			onError:(err: any) => {
				const error = err?.response?.data.message?.message
				console.log('on error', error)
	
				if(typeof error === 'string') {
					toast.error(error)
				} else if(typeof error === 'object') {
					error.forEach((element: string, index: number) => {
						if(index === 0) {
							toast.error(element)
						}
					});
				}
			}
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
