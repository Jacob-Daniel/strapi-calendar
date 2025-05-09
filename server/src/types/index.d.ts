import '@strapi/strapi';
import type { Core } from '@strapi/types';

declare module '@strapi/strapi' {
	interface Strapi {
		plugin(name: string): {
			controller(name: string): any;
			service(name: string): any;
		};
	}
}

export interface PluginController {
	getData(ctx: Context): Promise<void>;
	getCollections(ctx: Context): Promise<void>;
	getExtensions(ctx: Context): Promise<void>;
	getSettings(ctx: Context): Promise<void>;
	setSettings(ctx: Context): Promise<void>;
	clearSettings(ctx: Context): Promise<void>;
}
