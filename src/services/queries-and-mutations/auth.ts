import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import api from '../api';
import { login, signup } from '../api/auth';
import { LoginResponse, LoginDTO, SignupDTO } from '../utils/interface';

export function useLogin() {
	const navigate = useNavigate();

	return useMutation<LoginResponse, Error, LoginDTO>(login, {
		onSuccess: (data) => {
			localStorage.setItem('token', data.data.token);
			localStorage.setItem('username', data.data.username);
			api.defaults.headers.Authorization = `Bearer ${data.data.token}`;
			navigate('/todo-list');
		},
	});
}

export function useSignup() {
	const navigate = useNavigate();

	return useMutation<LoginResponse, Error, SignupDTO>(signup, {
		onSuccess: (data) => {
			localStorage.setItem('token', data.data.token);
			api.defaults.headers.Authorization = `Bearer ${data.data.token}`;
			navigate('/todo-list');
		},
	});
}
