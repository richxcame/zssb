import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TLogin, TLoginResponse, TMe } from '@/types/auth';

const login = async (values: TLogin): Promise<AxiosResponse<TLoginResponse>> =>
	api.post<TLoginResponse>('/auth/login', values);

const getMe = async (config?: any): Promise<AxiosResponse<TMe>> => api.get<TMe>('/auth/me', config);

export { getMe, login };
