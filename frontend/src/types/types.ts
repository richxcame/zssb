export type TLang = {
	tk: string;
	ru: string;
	en: string;
};

export type TCategory = {
	id: number;
	created_at: string;
	updated_at: string;
	title: TLang;
};

export type TCategories = TCategory[];

export type TCategoriesRes = {
	total: number;
	categories: TCategories;
};

export type TCategoriesQueries = {
	offset?: string | number;
	limit?: string | number;
};

export type TProduct = {
	id: number;
	created_at: string;
	updated_at: string;
	title: TLang;
	description: TLang;
	category_id: number;
	category: TCategory;
};

export type TProducts = TProduct[];
export type TProductsRes = {
	total: number;
	products: TProducts;
};
