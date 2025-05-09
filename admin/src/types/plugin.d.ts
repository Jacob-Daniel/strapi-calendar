import { PLUGIN_ID } from '../../../admin/src/pluginId';
import type { Core } from '@strapi/strapi';

declare module '@strapi/strapi' {
	export interface Strapi {
		plugin(name: typeof PLUGIN_ID): {
			service(name: 'service'): {
				getData(start: string, end: string): Promise<any>;
				getCollections(): Promise<any>;
				// ... other service methods
			};
		};
	}
}
