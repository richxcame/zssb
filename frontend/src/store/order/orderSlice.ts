import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TOrder, TOrders } from '@/types/order';

type SliceState = {
	orders: TOrders;
	totalOrders: number;
	order?: TOrder;
};

const initialState: SliceState = {
	orders: [],
	totalOrders: 0,
	order: undefined,
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setOrders(state, action: PayloadAction<TOrders>) {
			state.orders = action.payload;
		},
		setOrder(state, action: PayloadAction<TOrder>) {
			state.order = action.payload;
		},
		setOrdersTotal(state, action: PayloadAction<number>) {
			state.totalOrders = action.payload;
		},
	},
});

export const { setOrders, setOrder, setOrdersTotal } = categorySlice.actions;
export default categorySlice.reducer;
