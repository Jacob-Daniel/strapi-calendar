declare const api: {
    getCollections: () => Promise<import("axios").AxiosResponse<any, any>>;
    getExtensions: () => Promise<import("axios").AxiosResponse<any, any>>;
    getSettings: () => Promise<import("axios").AxiosResponse<any, any>>;
    setSettings: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
};
export default api;
