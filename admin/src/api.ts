import axios from 'axios';
import { PLUGIN_ID } from './pluginId';

const api = {
	getCollections: async () => {
		return await axios.get(`/${PLUGIN_ID}/collections`);
	},
	getExtensions: async () => {
		return await axios.get(`/${PLUGIN_ID}/extensions`);
	},
	getSettings: async () => {
		return await axios.get(`/${PLUGIN_ID}/settings`);
	},
	getCollectionFilters: async (contentType: string) => {
		return await axios.get(`/${PLUGIN_ID}/collection-filters?contentType=${contentType}`);
	},
	setSettings: async (data: any) => {
		return axios.post(`/${PLUGIN_ID}/settings`, data);
	},
};

export default api;
