import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/authSlice';
import categoryReducer from '@/store/category/categorySlice';

const store = configureStore({
	reducer: {
		category: categoryReducer,
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
