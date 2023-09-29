import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TSlider, TSlidersRes } from '@/types/slider';

const postSlider = async (slider: TSlider, config?: any): Promise<AxiosResponse<TSlider>> =>
	api.post<TSlider>('/sliders', slider, config);

const getSliders = async (config?: any): Promise<AxiosResponse<TSlidersRes>> =>
	api.get<TSlidersRes>('/sliders', config);

const getSlider = async (id: number, config?: any): Promise<AxiosResponse<TSlider>> =>
	api.get<TSlider>(`/sliders/${id}`, config);

const putSlider = async (id: number, body: any, config?: any): Promise<AxiosResponse<TSlider>> =>
	api.put<TSlider>(`/sliders/${id}`, body, config);

const deleteSlider = async (id: number, config?: any): Promise<AxiosResponse<TSlider>> =>
	api.delete<TSlider>(`/sliders/${id}`, config);

const deleteSliderImage = async (id: number, config?: any): Promise<AxiosResponse<TSlider>> =>
	api.delete<TSlider>(`/sliders/${id}/image`, config);

export { deleteSlider, deleteSliderImage, getSlider, getSliders, postSlider, putSlider };
