import createController from './controller';
import type { Core } from '@strapi/strapi';
declare const _default: {
    controller: (deps: {
        strapi: Core.Strapi;
    }) => ReturnType<typeof createController>;
};
export default _default;
