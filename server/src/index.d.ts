import type { Core } from '@strapi/strapi';
import { SettingsType } from '../../../types';

declare const _default: {
	register: ({ strapi }: { strapi: Core.Strapi }) => void;
	bootstrap: ({ strapi }: { strapi: Core.Strapi }) => void;
	destroy: ({ strapi }: { strapi: Core.Strapi }) => void;
	config: {
		default: {};
		validator(): void;
	};
	controllers: {
		controller: (deps: { strapi: Core.Strapi }) => import('../../types').IPluginController;
	};
	routes: {
		method: string;
		path: string;
		handler: string;
		config: {
			policies: any[];
			auth: boolean;
		};
	}[];
	services: {
		service: ({ strapi }: { strapi: Core.Strapi }) => {
			getData: (start: string, end: string) => Promise<any[]>;
			getCollections: () => Promise<any[]>;
			getCollectionFilters: (contentType: string) => Promise<
				{
					name: string;
					type: string;
					filterOperators: string[];
				}[]
			>;
			getExtensions: () => Promise<any[]>;
			getSettings: () => Promise<SettingsType>;
			setSettings: (settings: import('../../types').SettingsType) => Promise<SettingsType>;
			clearSettings: () => Promise<SettingsType>;
		};
	};
	contentTypes: {};
	policies: {};
	middlewares: {};
};
export default _default;
