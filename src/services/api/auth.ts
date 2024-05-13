import api from '../api';
import { LoginDTO, LoginResponse } from '../utils/interface';

export async function login(data: LoginDTO): Promise<LoginResponse> {
	return api.post(`/auth/sign-in`, data);
}

export async function signup(data: LoginDTO): Promise<LoginResponse> {
	return api.post(`/auth/sign-up`, data);
}
