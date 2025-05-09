import createController from './controller';
import type { Core } from '@strapi/strapi';

export default {
	controller: createController,
} as {
	controller: (deps: { strapi: Core.Strapi }) => ReturnType<typeof createController>;
};
