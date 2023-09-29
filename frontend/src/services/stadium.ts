import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TStadium, TStadiumsRes } from '@/types/stadium';

const postStadium = async (stadium: TStadium, config?: any): Promise<AxiosResponse<TStadium>> =>
	api.post<TStadium>('/stadiums', stadium, config);

const getStadiums = async (config?: any): Promise<AxiosResponse<TStadiumsRes>> =>
	api.get<TStadiumsRes>('/stadiums', config);

const getStadium = async (id: number, config?: any): Promise<AxiosResponse<TStadium>> =>
	api.get<TStadium>(`/stadiums/${id}`, config);

const putStadium = async (id: number, body: any, config?: any): Promise<AxiosResponse<TStadium>> =>
	api.put<TStadium>(`/stadiums/${id}`, body, config);

const deleteStadium = async (id: number, config?: any): Promise<AxiosResponse<TStadium>> =>
	api.delete<TStadium>(`/stadiums/${id}`, config);

const deleteStadiumImage = async (
	id: number,
	imageId: number,
	config?: any
): Promise<AxiosResponse<TStadium>> =>
	api.delete<TStadium>(`/stadiums/${id}/images/${imageId}`, config);

export { deleteStadium, deleteStadiumImage, getStadium, getStadiums, postStadium, putStadium };
