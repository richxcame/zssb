import axios from 'axios';

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL?.toString() || 'http://172.20.10.2:8080',
});

api.interceptors.request.use(
	async config => {
		if (!config?.headers) {
			throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
		}
		if (!config?.headers?.Authorization) {
			const token = localStorage.getItem('token');
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	error => Promise.reject(error)
);

export default api;
