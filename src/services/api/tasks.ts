import api from '../api';
import { Task } from '../utils/interface';

export async function browseTasks(): Promise<Task[]> {
	return (await api.get('/tasks')).data
}

export async function addNewTask(data: Task): Promise<Task> {
	return (await api.post('/tasks', data)).data
}

export async function updateTask(data: Task): Promise<Task> {
	return (await api.patch(`/tasks/${data.id}`, data)).data
}
