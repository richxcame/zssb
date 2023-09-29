import type { defaultNS, resources } from '@/plugins/reactI18n';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: typeof defaultNS;
		resources: typeof resources['tk'];
	}
}
