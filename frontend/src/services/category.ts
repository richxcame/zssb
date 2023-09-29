import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TCategoriesQueries, TCategoriesRes, TCategory } from '@/types/category';

const postCategory = async (category: TCategory, config?: any): Promise<AxiosResponse<TCategory>> =>
	api.post<TCategory>('/categories', category, config);

const getCategories = async (
	queries?: TCategoriesQueries,
	config?: any
): Promise<AxiosResponse<TCategoriesRes>> => {
	const urlSearchParams = new URLSearchParams();
	if (queries?.offset) {
		urlSearchParams.set('offset', queries.offset.toString());
	}
	if (queries?.limit) {
		urlSearchParams.set('limit', queries.limit.toString());
	}

	return api.get<TCategoriesRes>(`/categories?${urlSearchParams.toString()}`, config);
};

const getCategory = async (id: number, config?: any): Promise<AxiosResponse<TCategory>> =>
	api.get<TCategory>(`/categories/${id}`, config);

const putCategory = async (
	id: number,
	body: any,
	config?: any
): Promise<AxiosResponse<TCategory>> => api.put<TCategory>(`/categories/${id}`, body, config);

const deleteCategory = async (id: number, config?: any): Promise<AxiosResponse<TCategory>> =>
	api.delete<TCategory>(`/categories/${id}`, config);

export { deleteCategory, getCategories, getCategory, postCategory, putCategory };
