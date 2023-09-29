import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type {
	TCompetition,
	TCompetitionsRes,
	TCompetitionTableRes,
	TCompetitionToursRes,
	TCompetitionTypes,
} from '@/types/competition';

const postCompetition = async (
	competition: TCompetition,
	config?: any
): Promise<AxiosResponse<TCompetition>> =>
	api.post<TCompetition>('/competitions', competition, config);

const getCompetitions = async (config?: any): Promise<AxiosResponse<TCompetitionsRes>> =>
	api.get<TCompetitionsRes>('/competitions', config);

const getCompetition = async (
	id: number | string,
	config?: any
): Promise<AxiosResponse<TCompetition>> => api.get<TCompetition>(`/competitions/${id}`, config);

const getCompetitionTypes = async (config?: any): Promise<AxiosResponse<TCompetitionTypes>> =>
	api.get<TCompetitionTypes>(`/competitions/table`, config);

const getCompetitionTable = async (
	id: number | string,
	config?: any
): Promise<AxiosResponse<TCompetitionTableRes>> =>
	api.get<TCompetitionTableRes>(`/competitions/${id}/table`, config);

const getCompetitionTours = async (
	id: number | string,
	config?: any
): Promise<AxiosResponse<TCompetitionToursRes>> =>
	api.get<TCompetitionToursRes>(`/competitions/${id}/tours`, config);

const putCompetition = async (
	id: number,
	body: any,
	config?: any
): Promise<AxiosResponse<TCompetition>> =>
	api.put<TCompetition>(`/competitions/${id}`, body, config);

const deleteCompetition = async (id: number, config?: any): Promise<AxiosResponse<TCompetition>> =>
	api.delete<TCompetition>(`/competitions/${id}`, config);

export {
	deleteCompetition,
	getCompetition,
	getCompetitions,
	getCompetitionTable,
	getCompetitionTours,
	getCompetitionTypes,
	postCompetition,
	putCompetition,
};
