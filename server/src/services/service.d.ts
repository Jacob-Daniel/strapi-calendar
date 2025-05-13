import type { Core } from '@strapi/strapi';
import { SettingsType } from '../../../types';
declare const service: ({ strapi }: { strapi: Core.Strapi }) => {
	getData: (start: string, end: string) => Promise<any[]>;
	/**
	 * Retrieves all content types that are collection types.
	 */
	getCollections: () => Promise<any[]>;
	/**
	 * Retrieves all registered extensions.
	 */
	getExtensions: () => Promise<any[]>;
	/**
	 * Retrieves the current settings from the plugin store, or creates default settings if none exist.
	 */
	getSettings: () => Promise<SettingsType>;
	/**
	 * Retrieves all Collection type filters.
	 */
	getCollectionFilters: (contentType: string) => Promise<
		{
			name: string;
			type: string;
			filterOperators: string[];
		}[]
	>;
	/**
	 * Saves the provided settings to the plugin store.
	 */
	setSettings: (settings: SettingsType) => Promise<SettingsType>;
	/**
	 * Clears the current settings from the plugin store.
	 */
	clearSettings: () => Promise<SettingsType>;
	isFieldFilterable: (attribute: any) => boolean;
	getSupportedOperators: (fieldType: string) => string[];
	buildQueryFromFilters: (filters: any[]) => any;
};
export default service;
