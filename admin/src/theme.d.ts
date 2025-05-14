import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			neutral1000: string;
			primary600?: string;
		};
		spaces?: {
			[key: string]: string;
		};
	}
}
