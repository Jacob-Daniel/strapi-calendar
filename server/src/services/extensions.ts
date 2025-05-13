import { ExtensionType, ExtensionsMapType } from '../../../types';

const extensionSystem = {
	extensions: {} as ExtensionsMapType,

	/**
	 * Retrieves all registered extensions.
	 *
	 * @returns {ExtensionsMapType} The registered extensions.
	 */
	getRegisteredExtensions: (): ExtensionsMapType => {
		return extensionSystem.extensions;
	},

	/**
	 * Registers a single extension by its id and details.
	 *
	 * @param {string} id - The unique identifier for the extension.
	 * @param {string} name - The name of the extension.
	 * @param {string[]} startFields - The start fields handled by the extension.
	 * @param {string[]} endFields - The end fields handled by the extension.
	 * @param {Function} [startHandler] - Optional start handler function.
	 * @param {Function} [endHandler] - Optional end handler function.
	 * @param {Function} [filterHandler] - Optional filter handler function.
	 */
	registerExtension: (
		id: string,
		name: string,
		startFields: string[],
		endFields: string[],
		filterFields: string[],
		startHandler?: Function,
		endHandler?: Function,
		filterHandler?: Function
	): void => {
		extensionSystem.extensions[id] = {
			name,
			startFields,
			endFields,
			filterFields,
			startHandler,
			endHandler,
			filterHandler,
		};
	},

	/**
	 * Registers multiple extensions at once.
	 *
	 * @param {ExtensionType[]} extensions - The array of extensions to register.
	 */
	registerExtensions: (extensions: ExtensionType[]): void => {
		extensions.forEach((extension: ExtensionType) => {
			extensionSystem.registerExtension(
				extension.id,
				extension.name,
				extension.startFields,
				extension.endFields,
				extension.filterFields,
				extension.startHandler,
				extension.endHandler,
				extension.filterHandler
			);
		});
	},

	/**
	 * Deregisters an extension by its name.
	 *
	 * @param {string} name - The name of the extension to remove.
	 */
	deregisterExtension: (name: string): void => {
		delete extensionSystem.extensions[name];
	},
	/**
	 * Gets all extensions that support filtering for a specific field.
	 *
	 * @param {string} field - The field name to check.
	 * @returns {ExtensionsMapType} Filtered extensions map.
	 */
	getCollectionFiltersForField: (field: string): ExtensionsMapType => {
		return Object.entries(extensionSystem.extensions)
			.filter(([_, ext]) => ext.filterFields?.includes(field))
			.reduce((acc, [id, ext]) => ({ ...acc, [id]: ext }), {});
	},

	/**
	 * Gets all filterable fields across all extensions.
	 *
	 * @returns {string[]} Array of filterable field names.
	 */
	getCollectionFilters: (): string[] => {
		return Array.from(
			new Set(Object.values(extensionSystem.extensions).flatMap((ext) => ext.filterFields || []))
		);
	},
};

export default extensionSystem;
