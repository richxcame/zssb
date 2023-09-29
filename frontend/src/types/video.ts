export type TVideo = {
	id: number;
	title: {
		tk: string;
		en: string;
		ru: string;
	};
	path: string;
	is_active: boolean;
};

export type TVideos = TVideo[];

export type TVideosRes = {
	videos: TVideos;
	total: number;
};
