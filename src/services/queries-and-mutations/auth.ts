import { useMutation } from 'react-query';
import api from '../api';
import { login, signup } from '../api/auth';
import { LoginResponse, LoginDTO, SignupDTO } from '../utils/interface';
import { toast } from 'react-toastify';

export function useLogin() {

	return useMutation<LoginResponse, Error, LoginDTO>(login, {
		onSuccess: (data) => {
			localStorage.setItem('token', data.data.token);
			localStorage.setItem('username', data.data.username);
			api.defaults.headers.Authorization = `Bearer ${data.data.token}`;
			window.location.href = '/todo-list'
		},
		onError:(err: any) => {
			console.log('on error', err)
			const error = err?.response?.data.message?.message

			if(typeof error === 'string') {
				toast.error(error)
			} else if(typeof error === 'object') {
				error.forEach((element: string, index: number) => {
					if(index === 0) {
						toast.error(element)
					}
				});
			} else {
				toast.error('Some Error Occured')
			}
		}
	});
}

export function useSignup() {

	return useMutation<LoginResponse, Error, SignupDTO>(signup, {
		onSuccess: (data) => {
			localStorage.setItem('token', data.data.token);
			localStorage.setItem('username', data.data.username);
			api.defaults.headers.Authorization = `Bearer ${data.data.token}`;
			window.location.href = '/todo-list'
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
			}  else {
				toast.error('Some Error Occured')
			}
		}
	});
}
