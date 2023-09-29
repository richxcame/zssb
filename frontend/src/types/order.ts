export type TOrderProduct = {
	id: number;
	quantity: number;
};

export type TOrder = {
	id: number;
	phone: string;
	address: string;
	comment: string;
	products: TOrderProduct[];
};

export type TOrders = TOrder[];

export type TOrdersRes = {
	total: number;
	orders: TOrders;
};

export type TOrdersQueries = {
	offset?: number | string;
	limit?: number | string;
};
