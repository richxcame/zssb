import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { TNews, TNewsList } from '@/types/news';

type SliceState = {
	newsList: TNewsList;
	news: TNews;
	totalNews: number;
	articles: TNewsList;
	article?: TNews;
	totalArticles: number;
};

const initialState: SliceState = {
	newsList: [],
	news: {} as TNews,
	totalNews: 0,
	articles: [],
	article: undefined,
	totalArticles: 0,
};

const newsSlice = createSlice({
	name: 'news',
	initialState,
	reducers: {
		setNewsList(state, action: PayloadAction<TNewsList>) {
			state.newsList = action.payload;
		},
		setNews(state, action: PayloadAction<TNews>) {
			state.news = action.payload;
		},
		setTotalNumberOfNews(state, action: PayloadAction<number>) {
			state.totalNews = action.payload;
		},
		setArticles(state, action: PayloadAction<TNewsList>) {
			state.articles = action.payload;
		},
		setArticle(state, action: PayloadAction<TNews>) {
			state.article = action.payload;
		},
		setTotalNumberOfArticles(state, action: PayloadAction<number>) {
			state.totalArticles = action.payload;
		},
	},
});

export const {
	setTotalNumberOfNews,
	setNews,
	setNewsList,
	setArticle,
	setArticles,
	setTotalNumberOfArticles,
} = newsSlice.actions;
export default newsSlice.reducer;
