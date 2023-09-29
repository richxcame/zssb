import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TVideo, TVideosRes } from '@/types/video';

const postVideo = async (video: TVideo, config?: any): Promise<AxiosResponse<TVideo>> =>
	api.post<TVideo>('/videos', video, config);

const getVideos = async (config?: any): Promise<AxiosResponse<TVideosRes>> =>
	api.get<TVideosRes>('/videos', config);

const getVideo = async (id: number, config?: any): Promise<AxiosResponse<TVideo>> =>
	api.get<TVideo>(`/videos/${id}`, config);

const putVideo = async (id: number, body: any, config?: any): Promise<AxiosResponse<TVideo>> =>
	api.put<TVideo>(`/videos/${id}`, body, config);

const deleteVideo = async (id: number, config?: any): Promise<AxiosResponse<TVideo>> =>
	api.delete<TVideo>(`/videos/${id}`, config);

const deleteUploadedVideo = async (id: number, config?: any): Promise<AxiosResponse<TVideo>> =>
	api.delete<TVideo>(`/referees/${id}/image`, config);

export { deleteUploadedVideo, deleteVideo, getVideo, getVideos, postVideo, putVideo };
