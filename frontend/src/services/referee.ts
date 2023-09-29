import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TReferee, TRefereesRes } from '@/types/referee';

const postReferee = async (referee: TReferee, config?: any): Promise<AxiosResponse<TReferee>> =>
	api.post<TReferee>('/referees', referee, config);

const getReferees = async (config?: any): Promise<AxiosResponse<TRefereesRes>> =>
	api.get<TRefereesRes>('/referees', config);

const getReferee = async (id: number, config?: any): Promise<AxiosResponse<TReferee>> =>
	api.get<TReferee>(`/referees/${id}`, config);

const putReferee = async (id: number, body: any, config?: any): Promise<AxiosResponse<TReferee>> =>
	api.put<TReferee>(`/referees/${id}`, body, config);

const deleteReferee = async (id: number, config?: any): Promise<AxiosResponse<TReferee>> =>
	api.delete<TReferee>(`/referees/${id}`, config);

const deleteRefereeImage = async (id: number, config?: any): Promise<AxiosResponse<TReferee>> =>
	api.delete<TReferee>(`/referees/${id}/image`, config);

export { deleteReferee, deleteRefereeImage, getReferee, getReferees, postReferee, putReferee };
