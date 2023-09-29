import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TEmployee, TEmployeesRes } from '@/types/employee';

const postEmployee = async (employee: TEmployee, config?: any): Promise<AxiosResponse<TEmployee>> =>
	api.post<TEmployee>('/employees', employee, config);

const getEmployees = async (config?: any): Promise<AxiosResponse<TEmployeesRes>> =>
	api.get<TEmployeesRes>('/employees', config);

const getEmployee = async (id: number, config?: any): Promise<AxiosResponse<TEmployee>> =>
	api.get<TEmployee>(`/employees/${id}`, config);

const putEmployee = async (
	id: number,
	body: any,
	config?: any
): Promise<AxiosResponse<TEmployee>> => api.put<TEmployee>(`/employees/${id}`, body, config);

const deleteEmployee = async (id: number, config?: any): Promise<AxiosResponse<TEmployee>> =>
	api.delete<TEmployee>(`/employees/${id}`, config);

const deleteEmployeeImage = async (id: number, config?: any): Promise<AxiosResponse<TEmployee>> =>
	api.delete<TEmployee>(`/employees/${id}/image`, config);

export {
	deleteEmployee,
	deleteEmployeeImage,
	getEmployee,
	getEmployees,
	postEmployee,
	putEmployee,
};
