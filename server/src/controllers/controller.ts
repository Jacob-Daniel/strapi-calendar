// @ts-ignore
import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../../admin/src/pluginId';
import type { IPluginController } from '../../../types';

const createController = ({ strapi }: { strapi: Core.Strapi }): IPluginController => ({
	async getData(ctx: any): Promise<void> {
		ctx.body = await strapi
			.plugin(PLUGIN_ID)
			.service('service')
			.getData(ctx.query.start, ctx.query.end);
	},
	async getCollections(ctx: any): Promise<void> {
		try {
			ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getCollections();
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async getExtensions(ctx: any): Promise<void> {
		try {
			ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getExtensions();
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async getSettings(ctx: any): Promise<void> {
		try {
			ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getSettings();
		} catch (err) {
			ctx.throw(500, err);
		}
	},
	async setSettings(ctx: any): Promise<void> {
		// @ts-ignore-next-line
		const { body } = ctx.request;
		try {
			await strapi.plugin(PLUGIN_ID).service('service').setSettings(body);
			ctx.body = await strapi.plugin(PLUGIN_ID).service('service').getSettings();
		} catch (err) {
			ctx.throw(500, err);
		}
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
