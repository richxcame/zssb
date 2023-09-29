import type { ThemeConfig } from 'antd/es/config-provider/context';

const customTheme: ThemeConfig = {
	token: {
		colorPrimary: '#429941',
		colorLink: '#429941',
		colorLinkHover: '#056e05',
		fontSize: 14,
		controlHeight: 40,
	},
	components: {
		Layout: {
			colorBgHeader: '#e5e5e5',
			colorBgBody: '#e5e5e5',
		},
		Drawer: {
			size: 700,
		},
	},
};

export default customTheme;
export { customTheme };
