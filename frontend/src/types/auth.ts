export type TLogin = {
	username: string;
	password: string;
};

export type TLoginResponse = {
	token: string;
};

export type TMe = {
	id: number;
	username: string;
};
