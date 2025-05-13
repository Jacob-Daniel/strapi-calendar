// server/src/services/index.d.ts
import type { Core } from '@strapi/strapi';
import type { SettingsType } from '../../../types';

declare const _default: {
	service: ({ strapi }: { strapi: Core.Strapi }) => {
		getData: (start: string, end: string) => Promise<any[]>;
		getCollections: () => Promise<any[]>;
		getCollectionFilters: (contentType: string) => Promise<
			Array<{
				name: string;
				type: string;
				filterOperators: string[];
			}>
		>;
		getExtensions: () => Promise<any[]>;
		getSettings: () => Promise<SettingsType>;
		setSettings: (settings: SettingsType) => Promise<SettingsType>;
		clearSettings: () => Promise<SettingsType>;
	};
};
export default _default;
