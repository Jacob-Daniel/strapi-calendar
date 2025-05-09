declare const _default: {
    service: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        getData: (start: string, end: string) => Promise<any[]>;
        getCollections: () => Promise<any[]>;
        getExtensions: () => Promise<any[]>;
        getSettings: () => Promise<import("../../../types").SettingsType>;
        setSettings: (settings: import("../../../types").SettingsType) => Promise<import("../../../types").SettingsType>;
        clearSettings: () => Promise<import("../../../types").SettingsType>;
    };
};
export default _default;
