// src/theme.d.ts
import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			neutral1000: string;
			primary600?: string;
			// Add other color keys you actually use
		};
		spaces?: {
			[key: string]: string;
		};
		// Add other theme properties you need
	}
}
