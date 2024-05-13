export interface LoginResponse {
	data: User
}

export interface User {
	id: string;
	token: string;
	username: string;
	userImg: string;
}

export interface SignupResponse {
	id: string;
	token: string;
	username: string;
	userImg: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface SignupDTO {
	username: string;
	email: string;
	password: string;
}

export interface LoginFormValues {
	email: string;
	password: string;
}

export interface SignupFormData {
	username: string;
	email: string;
	password: string;
	confirm_password: string;
}

export interface TaskFormValues {
    title: string;
    description: string;
    completed: string;
	id: string
}

export interface Task {
	title: string;
	description: string;
	completed: boolean;
	id: string;
}

export interface TasksProps {}