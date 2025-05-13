// @ts-ignore
import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../../admin/src/pluginId';
import type { IPluginController } from '../../../types';

const createController = ({ strapi }: { strapi: Core.Strapi }): IPluginController => ({
	async getData(ctx: any): Promise<void> {
		ctx.body = await strapi
			.plugin(PLUGIN_ID)
			.service('service')
			.getData(ctx.query.start, ctx.query.end, ctx.query.filters);
	},
	async getCollections(ctx: any): Promise<void> {
		try {
			ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getCollections();
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async getCollectionFilters(ctx: any): Promise<void> {
		try {
			const { contentType } = ctx.query;

			if (!contentType) {
				ctx.throw(400, 'Content type is required');
				return;
			}

			ctx.body = await strapi
				.plugin(PLUGIN_ID)
				.service('service')
				.getCollectionFilters(contentType);
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async getExtensions(ctx: any): Promise<void> {
		try {
			const extensions = await strapi.plugin(PLUGIN_ID).service('service').getExtensions();

			ctx.body = extensions.map((ext) => ({
				...ext,
				hasFilters: ext.filterFields && ext.filterFields.length > 0,
				filterFields: ext.filterFields || [],
			}));
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async getSettings(ctx: any): Promise<void> {
		try {
			const settings = await strapi.plugin(PLUGIN_ID).service('service').getSettings();
			ctx.body = {
				...settings,
				filters: settings.filters || [],
			};
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async setSettings(ctx: any): Promise<void> {
		try {
			// @ts-ignore-next-line
			const { body } = ctx.request;
			if (body.collectionFilter) {
				const validFilters = await this.validateFilters(body.collectionFilter, body.collection);
				body.collectionFilter = validFilters;
			}

			await strapi.plugin(PLUGIN_ID).service('service').setSettings(body);

			ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getSettings();
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async validateFilters(filters: any[], contentType: string): Promise<any[]> {
		if (!contentType || !filters?.length) return filters;
		const model = strapi.getModel(contentType as any);
		if (!model) return [];

		const filterableFields = await strapi
			.plugin(PLUGIN_ID)
			.service('service')
			.getCollectionFilters(contentType);

		return filters.filter((filter) => {
			const fieldInfo = filterableFields.find((f) => f.name === filter.field);
			return fieldInfo && fieldInfo.filterOperators.includes(filter.operator);
		});
	},
	async clearSettings(ctx: any): Promise<void> {
		try {
			await strapi.plugin(PLUGIN_ID).service('service').clearSettings();
			ctx.body = 'Settings have been reset';
		} catch (err) {
			ctx.throw(500, err);
		}
	},
});

export default createController;
