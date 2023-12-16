import tinycolor from 'tinycolor2';

/**
 * Common GitHub-style colors.
 */
export const Colors = {
	draft: 'rgb(118, 131, 144)',
	open: 'rgb(87, 171, 90)',
	closed: 'rgb(229, 83, 75)',
	resolved: 'rgb(152, 110, 226)',
} as const;

export type Color = keyof typeof tinycolor.names | 'currentColor' | string;
