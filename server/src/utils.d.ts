import { SettingsType } from '../../types';
/**
 * Retrieves the plugin store for this plugin.
 */
export declare const getPluginStore: () => any;
/**
 * Creates the default plugin configuration in the store if not already set.
 */
export declare const createDefaultConfig: () => Promise<SettingsType>;
/**
 * Initializes the start and end handlers for retrieving data.
 * Handlers can be overridden by extensions if provided.
 *
 * @param {string} start - The start field identifier.
 * @param {string} end - The end field identifier.
 * @param {object} extensions - Registered extensions to override handlers.
 * @returns {[Function | undefined, Function | undefined]} Array containing startHandler and endHandler functions.
 */
export declare const initHandlers: (start: string, end: string, extensions: Record<string, any>) => [Function | undefined, Function | undefined];
