import '@strapi/strapi';
import { Context } from 'koa';

declare module '@strapi/strapi' {
	interface Strapi {
		plugin(name: string): {
			service(name: string): any;
			controller(name: string): any;
		};
	}
}

export interface IPluginController {
	getData(ctx: Context): Promise<void>;
	getCollections(ctx: Context): Promise<void>;
	getCollectionFilters(ctx: any): Promise<void>;
	getExtensions(ctx: Context): Promise<void>;
	getSettings(ctx: Context): Promise<void>;
	setSettings(ctx: Context): Promise<void>;
	clearSettings(ctx: Context): Promise<void>;
	validateFilters?(filters: any[], contentType: string): Promise<any[]>;
}

// Admin Types
export type SettingsType = {
	collection: null | string;
	startField: null | string;
	endField: null | string;
	titleField: null | string;
	colorField: null | string;
	defaultDuration: number;
	drafts: boolean;
	startHour: string;
	endHour: string;
	defaultView: string;
	monthView: boolean;
	weekView: boolean;
	workWeekView: boolean;
	dayView: boolean;
	todayButton: boolean;
	createButton: boolean;
	primaryColor: string;
	eventColor: string;
	collectionFilters: Array<{
		field: null | string;
		operator: null | string;
		value: null | string;
	}>;
};

export type SettingsContextType = {
	settings: SettingsType;
	updateField: (setting: Partial<SettingsType>) => void;
	saveSettings: () => Promise<void>;
	loading: boolean;
	saving: boolean;
};

// Server Types
export type ExtensionType = {
	id: string;
	name: string;
	startFields: string[];
	endFields: string[];
	filterFields?: string[];
	startHandler?: Function;
	endHandler?: Function;
	filterHandler?: Function;
};

export type ExtensionsMapType = Record<
	string,
	{
		name: string;
		startFields: string[];
		endFields: string[];
		filterFields?: string[];
		startHandler?: Function;
		endHandler?: Function;
		filterHandler?: Function;
	}
>;

export interface CollectionFilter {
	name: string;
	type: string;
	filterOperators: string[];
}
