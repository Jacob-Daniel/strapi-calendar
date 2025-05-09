import '@strapi/strapi';

declare module '@strapi/strapi' {
	interface Strapi {
		plugin(name: string): {
			service(name: string): any;
			controller(name: string): any;
		};
	}
}
