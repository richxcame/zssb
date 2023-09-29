import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TNews, TNewsListQueries, TNewsListRes } from '@/types/news';

const postNews = async (news: TNews, config?: any): Promise<AxiosResponse<TNews>> =>
	api.post<TNews>('/news', news, config);

const getNewsList = async (
	queries?: TNewsListQueries,
	config?: any
): Promise<AxiosResponse<TNewsListRes>> =>
	api.get<TNewsListRes>(
		`/news?is_article=${queries ? queries.is_article : ''}&offset=${queries?.offset}&limit=${
			queries?.limit
		}`,
		config
	);

const getNews = async (id: number | string, config?: any): Promise<AxiosResponse<TNews>> =>
	api.get<TNews>(`/news/${id}`, config);

const putNews = async (id: number, body: any, config?: any): Promise<AxiosResponse<TNews>> =>
	api.put<TNews>(`/news/${id}`, body, config);

const deleteNews = async (id: number, config?: any): Promise<AxiosResponse<TNews>> =>
	api.delete<TNews>(`/news/${id}`, config);

const deleteNewsImage = async (id: number, config?: any): Promise<AxiosResponse<TNews>> =>
	api.delete<TNews>(`/news/${id}/image`, config);

export { deleteNews, deleteNewsImage, getNews, getNewsList, postNews, putNews };
