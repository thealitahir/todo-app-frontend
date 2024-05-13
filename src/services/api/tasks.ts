import api from '../api';
import { endpoints } from '../utils/endpoints';
import { Task } from '../utils/interface';

export async function browseTasks(): Promise<Task[]> {
	return (await api.get(endpoints.getTasks())).data
}

export async function addNewTask(data: Task): Promise<Task> {
	return (await api.post(endpoints.createTask(), data)).data
}

export async function updateTask(data: Task): Promise<Task> {
	return (await api.patch(endpoints.updateTask(data.id), data)).data
}
