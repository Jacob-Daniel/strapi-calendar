import { ExtensionType, ExtensionsMapType } from '../../../types';
declare const extensionSystem: {
	extensions: ExtensionsMapType;
	/**
	 * Retrieves all registered extensions.
	 *
	 * @returns {ExtensionsMapType} The registered extensions.
	 */
	getRegisteredExtensions: () => ExtensionsMapType;
	/**
	 * Registers a single extension by its id and details.
	 *
	 * @param {string} id - The unique identifier for the extension.
	 * @param {string} name - The name of the extension.
	 * @param {string[]} startFields - The start fields handled by the extension.
	 * @param {string[]} endFields - The end fields handled by the extension.
	 * @param {string[]} filterFields - The fields that support custom filtering.
	 * @param {Function} [startHandler] - Optional start handler function.
	 * @param {Function} [endHandler] - Optional end handler function.
	 * @param {Function} [filteHandler] - Optional filter handler function.
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
	) => void;
	/**
	 * Registers multiple extensions at once.
	 *
	 * @param {ExtensionType[]} extensions - The array of extensions to register.
	 */
	registerExtensions: (extensions: ExtensionType[]) => void;
	/**
	 * Deregisters an extension by its name.
	 *
	 * @param {string} name - The name of the extension to remove.
	 */
	deregisterExtension: (name: string) => void;

	// Filter-related methods (updated names)
	getCollectionFiltersForField(field: string): ExtensionsMapType;
	getCollectionFilters(): string[];
};
export default extensionSystem;
