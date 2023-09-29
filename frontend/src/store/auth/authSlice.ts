import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type SliceState = {
	isAuthenticated: boolean;
	accessToken: string;
};

const initialState: SliceState = {
	isAuthenticated: false,
	accessToken: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<boolean>) {
			state.isAuthenticated = action.payload;
		},
		setAccessToken(state, action: PayloadAction<string>) {
			state.accessToken = action.payload;
		},
	},
});

export const { setAuth, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
