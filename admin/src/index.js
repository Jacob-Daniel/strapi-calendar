import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
export default {
    register(app) {
        app.addMenuLink({
            to: `plugins/${PLUGIN_ID}`,
            icon: PluginIcon,
            intlLabel: {
                id: `${PLUGIN_ID}.plugin.name`,
                defaultMessage: PLUGIN_ID,
            },
            Component: () => import('./pages/App'),
        });
        app.createSettingSection({
            id: PLUGIN_ID,
            intlLabel: {
                id: `${PLUGIN_ID}.plugin.name`,
                defaultMessage: `${PLUGIN_ID} Settings`,
            },
        }, [
            {
                intlLabel: {
                    id: `${PLUGIN_ID}.plugin.name`,
                    defaultMessage: 'Settings',
                },
                id: 'settings',
                to: `${PLUGIN_ID}`,
                Component: () => import('./pages/SettingsPage'),
            },
        ]);
        app.registerPlugin({
            id: PLUGIN_ID,
            initializer: Initializer,
            isReady: false,
            name: PLUGIN_ID,
        });
    },
    async registerTrads(app) {
        const { locales } = app;
        const importedTranslations = await Promise.all((locales ?? []).map(async (locale) => {
            try {
                const { default: data } = await import(`./translations/${locale}.json`);
                return {
                    data: prefixPluginTranslations(data, PLUGIN_ID),
                    locale,
                };
            }
            catch {
                return {
                    data: {},
                    locale,
                };
            }
        }));
        return importedTranslations;
    },
};
const prefixPluginTranslations = (trad, pluginId) => {
    if (!pluginId) {
        throw new TypeError("pluginId can't be empty");
    }
    return Object.keys(trad).reduce((acc, current) => {
        acc[`${pluginId}.${current}`] = trad[current];
        return acc;
    }, {});
};
