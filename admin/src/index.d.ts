/// <reference types="react" />
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
declare const _default: {
    register(app: App): void;
    registerTrads(app: App): Promise<{
        data: TradOptions;
        locale: string;
    }[]>;
};
export default _default;
type TradOptions = Record<string, string>;
