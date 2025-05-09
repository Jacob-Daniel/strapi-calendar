declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    destroy: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    config: {
        default: {};
        validator(): void;
    };
    controllers: {
        controller: (deps: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => import("../../types").IPluginController;
    };
    routes: {
        method: string;
        path: string;
        handler: string;
        config: {
            policies: any[];
            auth: boolean;
        };
    }[];
    services: {
        service: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            getData: (start: string, end: string) => Promise<any[]>;
            getCollections: () => Promise<any[]>;
            getExtensions: () => Promise<any[]>;
            getSettings: () => Promise<import("../../types").SettingsType>;
            setSettings: (settings: import("../../types").SettingsType) => Promise<import("../../types").SettingsType>;
            clearSettings: () => Promise<import("../../types").SettingsType>;
        };
    };
    contentTypes: {};
    policies: {};
    middlewares: {};
};
export default _default;
