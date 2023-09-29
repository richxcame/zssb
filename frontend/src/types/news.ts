export type TNews = {
	id: number;
	title: {
		tk: string;
		en: string;
		ru: string;
	};
	description: {
		tk: string;
		en: string;
		ru: string;
	};
	image: string;
	is_article: boolean;
	is_active: boolean;
};

export type TNewsList = TNews[];

export type TNewsListRes = {
	news: TNewsList;
	total: number;
};

export type TNewsListQueries = {
	is_article?: boolean | string;
	offset?: number | string;
	limit?: number | string;
};
