import type { AxiosResponse } from 'axios';

import api from '@/plugins/axios';
import type { TOrder, TOrdersQueries, TOrdersRes } from '@/types/order';

const getOrders = async (
	queries?: TOrdersQueries,
	config?: any
): Promise<AxiosResponse<TOrdersRes>> => {
	const urlSearchParams = new URLSearchParams();
	if (queries?.offset) {
		urlSearchParams.set('offset', queries.offset.toString());
	}
	if (queries?.limit) {
		urlSearchParams.set('limit', queries.limit.toString());
	}

	return api.get<TOrdersRes>(`/orders?${urlSearchParams.toString()}`, config);
};

const deleteOrder = async (id: number, config?: any): Promise<AxiosResponse<TOrder>> =>
	api.delete<TOrder>(`/orders/${id}`, config);

export { deleteOrder, getOrders };
