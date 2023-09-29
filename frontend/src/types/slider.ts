export type TSlider = {
	id: number;
	title: {
		tk: string;
		en: string;
		ru: string;
	};
	image: string;
	link: string;
	status: number;
};

export type TSliders = TSlider[];

export type TSlidersRes = {
	sliders: TSliders;
};
