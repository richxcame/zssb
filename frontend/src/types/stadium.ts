export type TStadium = {
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
	images: {
		id: number;
		stadium_id: number;
		path: string;
	}[];
	is_active: boolean;
};

export type TStadiums = TStadium[];

export type TStadiumsRes = {
	stadiums: TStadiums;
};
