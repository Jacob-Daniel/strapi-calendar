import type { Core } from '@strapi/strapi';
import type { IPluginController } from '../../../types';
declare const createController: ({ strapi }: {
    strapi: Core.Strapi;
}) => IPluginController;
export default createController;
