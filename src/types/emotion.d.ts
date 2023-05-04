import "@emotion/react";

declare module "@emotion/react" {
	export interface Theme {
		primary: string;
		background: string;
		textPrimary: string;
		textSecondary: string;
		bgSecondary: string;
		inactiveCharColor: string;
		typedCharColor: string;
	}
}
