import Axios from 'axios';

const api = Axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + localStorage.getItem('token'),
	},
});

api.interceptors.response.use(
	(response) => response.data,
	async (error) => {
		const errorCode = error?.response?.status;
		if (errorCode === 401 && error.response.config.url !== '/auth/login') {
			localStorage.clear();
			window.location.href = '/';
		}
		return Promise.reject(error);
	}
);

export default api;
