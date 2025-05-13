import type { Core } from '@strapi/strapi';
import moment from 'moment';
import merge from 'deepmerge';
import extensionSystem from './extensions';

import { createDefaultConfig, getPluginStore, initHandlers } from '../utils';
import { SettingsType, CollectionFilter } from '../../../types';

const service = ({ strapi }: { strapi: Core.Strapi }) => ({
	getData: async (start: string, end: string): Promise<any[]> => {
		const pluginStore = getPluginStore();
		let config: SettingsType | null = await pluginStore.get({ key: 'settings' });
		if (!config) return [];

		const [startHandler, endHandler] = initHandlers(
			config.startField,
			config.endField,
			extensionSystem.getRegisteredExtensions()
		);

		let data: Record<string, any> = {};
		if (startHandler) {
			data = await startHandler(start, end, strapi, config);
		}
		if (endHandler) {
			data = merge(await endHandler(strapi, config, data), data);
		}

		// Filter out drafts if not configured to show them
		const dataFiltered = Object.values(data).filter((x) => {
			if (config.drafts) return true;
			return x.publishedAt;
		});

		// Map data into the required format
		return dataFiltered.map((x) => ({
			id: x.documentId,
			title: config.titleField ? x[config.titleField] : config.startField,
			start: x[config.startField],
			end: config.endField
				? x[config.endField]
				: moment(x[config.startField]).add(config.defaultDuration, 'minutes'),
			backgroundColor:
				config.colorField && x[config.colorField] ? x[config.colorField] : config.eventColor,
			borderColor:
				config.colorField && x[config.colorField] ? x[config.colorField] : config.eventColor,
			url: `/admin/content-manager/collection-types/${config.collection}/${x.documentId}`,
		}));
	},

	/**
	 * Retrieves all content types that are collection types.
	 */
	getCollections: async (): Promise<any[]> => {
		const types = strapi.contentTypes;
		return Object.values(types).filter((type) => type.kind === 'collectionType' && type.apiName);
	},

	/**
	 * Get filterable fields for a content type
	 */
	getCollectionFilters: async (contentType: string): Promise<CollectionFilter[]> => {
		const model = strapi.getModel(contentType as any);
		if (!model || !model.attributes) return [];

		const attributes = model.attributes;

		return Object.entries(attributes)
			.filter(([_, attr]) => service({ strapi }).isFieldFilterable(attr)) // now valid
			.map(([key, attr]) => ({
				name: key,
				type: attr.type,
				filterOperators: service({ strapi }).getSupportedOperators(attr.type),
			}));
	},

	/**
	 * Retrieves all registered extensions.
	 */
	getExtensions: async (): Promise<any[]> => {
		return Object.entries(extensionSystem.getRegisteredExtensions()).map(([id, extension]) => ({
			id,
			name: extension.name,
			startFields: extension.startFields,
			endFields: extension.endFields,
		}));
	},

	/**
	 * Retrieves the current settings from the plugin store, or creates default settings if none exist.
	 */
	getSettings: async (): Promise<SettingsType> => {
		const pluginStore = getPluginStore();
		let config = await pluginStore.get({ key: 'settings' });
		if (!config) {
			config = await createDefaultConfig();
		}
		return config;
	},

	/**
	 * Saves the provided settings to the plugin store.
	 */
	setSettings: async (settings: SettingsType): Promise<SettingsType> => {
		const pluginStore = getPluginStore();
		await pluginStore.set({ key: 'settings', value: settings });
		return pluginStore.get({ key: 'settings' });
	},

	/**
	 * Clears the current settings from the plugin store.
	 */
	clearSettings: async (): Promise<SettingsType> => {
		const pluginStore = getPluginStore();
		await pluginStore.set({ key: 'settings', value: null });
		return pluginStore.get({ key: 'settings' });
	},

	/**
	 * Check if a field is filterable
	 */
	isFieldFilterable: (attribute: any) => {
		const nonFilterableTypes = ['json', 'component', 'dynamiczone', 'media'];
		return !nonFilterableTypes.includes(attribute.type);
	},

	/**
	 * Get supported operators for a field type
	 */
	getSupportedOperators: (fieldType: string) => {
		const operators = {
			string: ['eq', 'ne', 'contains', 'notContains', 'startsWith', 'endsWith'],
			number: ['eq', 'ne', 'lt', 'lte', 'gt', 'gte'],
			date: ['eq', 'ne', 'lt', 'lte', 'gt', 'gte'],
			boolean: ['eq', 'ne'],
			enumeration: ['eq', 'ne'],
		};

		return operators[fieldType] || operators.string;
	},

	/**
	 * Build Strapi query from filters
	 */
	buildQueryFromFilters: (filters: any[] = []) => {
		const query: any = { where: {} };

		filters.forEach((filter) => {
			if (!filter.field || !filter.operator) return;

			if (filter.operator === 'eq') {
				query.where[filter.field] = filter.value;
			} else {
				query.where[filter.field] = {
					[filter.operator]: filter.value,
				};
			}
		});

		return query;
	},
});

export default service;
