import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TPartner, TPartnersRes } from '@/types/partner';

const postPartner = async (partner: TPartner, config?: any): Promise<AxiosResponse<TPartner>> =>
	api.post<TPartner>('/partners', partner, config);

const getPartners = async (config?: any): Promise<AxiosResponse<TPartnersRes>> =>
	api.get<TPartnersRes>('/partners', config);

const getPartner = async (id: number, config?: any): Promise<AxiosResponse<TPartner>> =>
	api.get<TPartner>(`/partners/${id}`, config);

const putPartner = async (id: number, body: any, config?: any): Promise<AxiosResponse<TPartner>> =>
	api.put<TPartner>(`/partners/${id}`, body, config);

const deletePartner = async (id: number, config?: any): Promise<AxiosResponse<TPartner>> =>
	api.delete<TPartner>(`/partners/${id}`, config);

const deletePartnerImage = async (id: number, config?: any): Promise<AxiosResponse<TPartner>> =>
	api.delete<TPartner>(`/partners/${id}/image`, config);

export { deletePartner, deletePartnerImage, getPartner, getPartners, postPartner, putPartner };
