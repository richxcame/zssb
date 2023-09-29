import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TTeam, TTeamsRes } from '@/types/team';

const postTeam = async (team: TTeam, config?: any): Promise<AxiosResponse<TTeam>> =>
	api.post<TTeam>('/teams', team, config);

const getTeams = async (config?: any): Promise<AxiosResponse<TTeamsRes>> =>
	api.get<TTeamsRes>('/teams', config);

const getTeam = async (id: number, config?: any): Promise<AxiosResponse<TTeam>> =>
	api.get<TTeam>(`/teams/${id}`, config);

const putTeam = async (id: number, body: any, config?: any): Promise<AxiosResponse<TTeam>> =>
	api.put<TTeam>(`/teams/${id}`, body, config);

const deleteTeam = async (id: number, config?: any): Promise<AxiosResponse<TTeam>> =>
	api.delete<TTeam>(`/teams/${id}`, config);

const deleteTeamImage = async (id: number, config?: any): Promise<AxiosResponse<TTeam>> =>
	api.delete<TTeam>(`/teams/${id}/image`, config);

export { deleteTeam, deleteTeamImage, getTeam, getTeams, postTeam, putTeam };
