import moment from 'moment';
import { PLUGIN_ID } from '../../admin/src/pluginId';
import defaultSettings from '../../admin/src/utils/defaultSettings';
/**
 * Retrieves the plugin store for this plugin.
 */
export const getPluginStore = () => {
    return strapi.store({
        environment: '',
        type: 'plugin',
        name: PLUGIN_ID,
    });
};
/**
 * Creates the default plugin configuration in the store if not already set.
 */
export const createDefaultConfig = async () => {
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
export const initHandlers = (start, end, extensions) => {
    // Default start handler
    let startHandler = async (startDate, endDate, strapi, config) => (await strapi.documents(config.collection).findMany({
        filters: {
            $and: [
                {
                    [config.startField]: {
                        $gte: moment(startDate).startOf('day').format(),
                        $lte: moment(endDate).endOf('day').format(),
                    },
                },
            ],
        },
    })).reduce((acc, el) => {
        acc[el.id] = el;
        return acc;
    }, {});
    let endHandler;
    // Override handlers if matching extension is found
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
