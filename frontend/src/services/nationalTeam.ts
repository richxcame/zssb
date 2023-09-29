import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TNationalTeam, TNationalTeamsRes } from '@/types/nationalTeam';

const postNationalTeam = async (
	nationalTeam: TNationalTeam,
	config?: any
): Promise<AxiosResponse<TNationalTeam>> =>
	api.post<TNationalTeam>('/national-teams', nationalTeam, config);

const getNationalTeams = async (config?: any): Promise<AxiosResponse<TNationalTeamsRes>> =>
	api.get<TNationalTeamsRes>(`/national-teams`, config);

const getNationalTeam = async (
	id: number | string,
	config?: any
): Promise<AxiosResponse<TNationalTeam>> => api.get<TNationalTeam>(`national-teams/${id}`, config);

const putNationalTeam = async (
	id: number,
	body: any,
	config?: any
): Promise<AxiosResponse<TNationalTeam>> =>
	api.put<TNationalTeam>(`national-teams/${id}`, body, config);

const deleteNationalTeam = async (
	id: number,
	config?: any
): Promise<AxiosResponse<TNationalTeam>> =>
	api.delete<TNationalTeam>(`national-teams/${id}`, config);

const deleteNationalTeamImage = async (
	id: number,
	config?: any
): Promise<AxiosResponse<TNationalTeam>> =>
	api.delete<TNationalTeam>(`national-teams/${id}/image`, config);

export {
	deleteNationalTeam,
	deleteNationalTeamImage,
	getNationalTeam,
	getNationalTeams,
	postNationalTeam,
	putNationalTeam,
};
