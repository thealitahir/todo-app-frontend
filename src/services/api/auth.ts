import api from '../api';
import { endpoints } from '../utils/endpoints';
import { LoginDTO, LoginResponse } from '../utils/interface';

export async function login(data: LoginDTO): Promise<LoginResponse> {
	return api.post(endpoints.signIn(), data);
}

export async function signup(data: LoginDTO): Promise<LoginResponse> {
	return api.post(endpoints.signup(), data);
}
