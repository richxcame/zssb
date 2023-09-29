import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TProduct, TProducts } from '@/types/product';

type SliceState = {
	products: TProducts;
	totalProduct: number;
	product?: TProduct;
};

const initialState: SliceState = {
	products: [],
	totalProduct: 0,
	product: undefined,
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts(state, action: PayloadAction<TProducts>) {
			state.products = action.payload;
		},
		setProduct(state, action: PayloadAction<TProduct>) {
			state.product = action.payload;
		},
		setProductsTotal(state, action: PayloadAction<number>) {
			state.totalProduct = action.payload;
		},
	},
});

export const { setProduct, setProducts, setProductsTotal } = productSlice.actions;
export default productSlice.reducer;
