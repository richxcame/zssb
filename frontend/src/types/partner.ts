export type TPartner = {
	id: number;
	title: {
		tk: string;
		en: string;
		ru: string;
	};
	link: string;
	is_active: boolean;
	image: string;
};

export type TPartners = TPartner[];

export type TPartnersRes = {
	partners: TPartners;
};
