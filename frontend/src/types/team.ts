export type TTeam = {
	id: number;
	name: {
		tk: string;
		en: string;
		ru: string;
	};
	logo: string;
	type: string;
};

export type TTeams = TTeam[];

export type TTeamsRes = {
	teams: TTeams;
};
