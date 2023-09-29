export type TTitle = {
	tk: string;
	en: string;
	ru: string;
};

export type TProduct = {
	id: number;
	title: TTitle;
	price: number;
	is_active: boolean;
	category_id: number;
	description: TTitle;
};

export type TProducts = TProduct[];

export type TProductRes = {
	data: TProducts[];
	total: number;
};
