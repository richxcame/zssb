import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TCategories, TCategory } from '@/types/category';

type SliceState = {
	categories: TCategories;
	totalCategories: number;
	category?: TCategory;
};

const initialState: SliceState = {
	categories: [],
	totalCategories: 0,
	category: undefined,
};

const categorySlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		setCategories(state, action: PayloadAction<TCategories>) {
			state.categories = action.payload;
		},
		setCategory(state, action: PayloadAction<TCategory>) {
			state.category = action.payload;
		},
		setCategoriesTotal(state, action: PayloadAction<number>) {
			state.totalCategories = action.payload;
		},
	},
});

export const { setCategories, setCategory, setCategoriesTotal } = categorySlice.actions;
export default categorySlice.reducer;
