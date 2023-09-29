import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
	language: 'tk' | 'en' | 'ru';
};

const initialState: SliceState = {
	language: 'tk',
};

const languageSlice = createSlice({
	name: 'languages',
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<'tk' | 'en' | 'ru'>) {
			state.language = action.payload;
		},
	},
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
