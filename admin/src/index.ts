// @ts-ignore

import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

interface App {
	addMenuLink(options: any): void;
	createSettingSection(section: any, links: any[]): void;
	registerPlugin(plugin: {
		id: string;
		initializer: React.ComponentType;
		isReady: boolean;
		name: string;
	}): void;
	locales?: string[];
}

export default {
	register(app: App) {
		app.addMenuLink({
			to: `plugins/${PLUGIN_ID}`,
			icon: PluginIcon,
			intlLabel: {
				id: `${PLUGIN_ID}.plugin.name`,
				defaultMessage: PLUGIN_ID,
			},
			Component: () => import('./pages/App'),
		});

		app.createSettingSection(
			{
				id: PLUGIN_ID,
				intlLabel: {
					id: `${PLUGIN_ID}.plugin.name`,
					defaultMessage: `${PLUGIN_ID} Settings`,
				},
			},
			[
				{
					intlLabel: {
						id: `${PLUGIN_ID}.plugin.name`,
						defaultMessage: 'Settings',
					},
					id: 'settings',
					to: `${PLUGIN_ID}`,
					Component: () => import('./pages/SettingsPage'),
				},
			]
		);
		app.registerPlugin({
			id: PLUGIN_ID,
			initializer: Initializer,
			isReady: false,
			name: PLUGIN_ID,
		});
	},

	async registerTrads(app: App) {
		const { locales } = app;

		const importedTranslations = await Promise.all(
			(locales ?? []).map(async (locale) => {
				try {
					const { default: data } = await import(`./translations/${locale}.json`);
					return {
						data: prefixPluginTranslations(data, PLUGIN_ID),
						locale,
					};
				} catch {
					return {
						data: {},
						locale,
					};
				}
			})
		);

		return importedTranslations;
	},
};

type TradOptions = Record<string, string>;
const prefixPluginTranslations = (trad: TradOptions, pluginId: string): TradOptions => {
	if (!pluginId) {
		throw new TypeError("pluginId can't be empty");
	}
	return Object.keys(trad).reduce((acc, current) => {
		acc[`${pluginId}.${current}`] = trad[current];
		return acc;
	}, {} as TradOptions);
};
