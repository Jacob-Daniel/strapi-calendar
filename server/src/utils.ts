import moment from 'moment';

import { PLUGIN_ID } from '../../admin/src/pluginId';
import defaultSettings from '../../admin/src/utils/defaultSettings';
import { SettingsType } from '../../types';

/**
 * Retrieves the plugin store for this plugin.
 */
export const getPluginStore = (): any => {
	return strapi.store({
		environment: '',
		type: 'plugin',
		name: PLUGIN_ID,
	});
};

/**
 * Creates the default plugin configuration in the store if not already set.
 */
export const createDefaultConfig = async (): Promise<SettingsType> => {
	const pluginStore = getPluginStore();
	await pluginStore.set({ key: 'settings', value: defaultSettings });
	return pluginStore.get({ key: 'settings' });
};

/**
 * Initializes the start and end handlers for retrieving data.
 * Handlers can be overridden by extensions if provided.
 *
 * @param {string} start - The start field identifier.
 * @param {string} end - The end field identifier.
 * @param {object} extensions - Registered extensions to override handlers.
 * @returns {[Function | undefined, Function | undefined]} Array containing startHandler and endHandler functions.
 */

export const initHandlers = (
	start: string,
	end: string,
	extensions: Record<string, any>
): [Function | undefined, Function | undefined] => {
	let startHandler: Function = async (
		startDate: string,
		endDate: string,
		strapi: any,
		config: SettingsType
	) => {
		function parseValue(value: string): any {
			if (value === 'true') return true;
			if (value === 'false') return false;
			if (!isNaN(Number(value))) return Number(value);
			const isoDate = Date.parse(value);
			if (!isNaN(isoDate)) return new Date(isoDate).toISOString();
			return value;
		}

		function buildFilters(
			collectionFilters: Array<{ field: string; operator: string; value: string }>
		) {
			const filters: any = {};
			if (collectionFilters) {
				collectionFilters.forEach(({ field, operator, value }) => {
					filters[field] = {
						[`$${operator}`]: parseValue(value),
					};
				});
			}
			return filters;
		}
		const filters = buildFilters(config.collectionFilters);

		const results = await strapi.entityService.findMany(config.collection, {
			filters: {
				$and: [
					{
						[config.startField]: {
							$gte: moment(startDate).startOf('day').toISOString(),
							$lte: moment(endDate).endOf('day').toISOString(),
						},
					},
					filters,
				],
			},
		});

		return results.reduce((acc: Record<string, any>, el: any) => {
			acc[el.id] = el;
			return acc;
		}, {});
	};

	let endHandler: Function | undefined;

	Object.entries(extensions).forEach(([id, extension]) => {
		if (id && start.startsWith(id)) {
			startHandler = extension.startHandler;
		}
		if (id && end.startsWith(id)) {
			endHandler = extension.endHandler;
		}
	});

	return [startHandler, endHandler];
};

export function normalizeDateValue(input: string | Date | null | undefined): string | null {
	if (!input) return null;

	if (input instanceof Date) {
		return input.toISOString();
	}

	if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
		return new Date(input + 'T00:00:00Z').toISOString();
	}

	return new Date(input).toISOString();
}
