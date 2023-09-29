import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/store/auth/authSlice';
import categoryReducer from '@/store/category/categorySlice';
import newsReducer from '@/store/news/newsSlice';
import orderReducer from '@/store/order/orderSlice';
import partnerReducer from '@/store/partner/partnerSlice';

const store = configureStore({
	reducer: {
		category: categoryReducer,
		news: newsReducer,
		order: orderReducer,
		auth: authReducer,
		partner: partnerReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
