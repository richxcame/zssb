import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TCategoriesQueries } from '@/types/category';
import type { TProductRes } from '@/types/product';
import type { TProduct } from '@/types/types';

const postProduct = async (product: TProduct, config?: any): Promise<AxiosResponse<TProduct>> =>
	api.post<TProduct>('/products', product, config);

const getProducts = async (
	queries?: TCategoriesQueries,
	config?: any
): Promise<AxiosResponse<TProductRes>> => {
	const urlSearchParams = new URLSearchParams();

	if (queries?.offset) {
		urlSearchParams.set('offset', queries.offset.toString());
	}
	if (queries?.limit) {
		urlSearchParams.set('limit', queries.limit.toString());
	}

	return api.get<TProductRes>(`/products?${urlSearchParams.toString()}`, config);
};

const getProduct = async (id: number, config?: any): Promise<AxiosResponse<TProductRes>> =>
	api.get<TProductRes>(`/product/${id}`, config);

const putProduct = async (id: number, body: any, config?: any): Promise<AxiosResponse<TProduct>> =>
	api.put<TProduct>(`/product/${id}`, body, config);

const deleteProduct = async (id: number, config?: any): Promise<AxiosResponse<TProduct>> =>
	api.delete<TProduct>(`/products/${id}`, config);

export { deleteProduct, getProduct, getProducts, postProduct, putProduct };
