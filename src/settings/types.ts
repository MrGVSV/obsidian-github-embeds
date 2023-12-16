export interface Settings {
	readonly githubToken?: string;
	readonly embedIssues: boolean;
	readonly embedFiles: boolean;
	readonly labelDisplay: DisplayLocation;
	readonly autoOpenThreshold: number;
	readonly dateFormat: string;
	readonly showTotalComments: boolean;
}

export type DisplayLocation = 'preview' | 'inside' | 'none';

export type SettingsListener = (prev: Settings | null, curr: Settings) => Promise<void> | void;

export interface SettingsListenerOptions {
	/**
	 * If true, the listener will be called immediately with the current settings.
	 *
	 * This is useful for listeners that need to initialize some state based on the
	 * current settings, while still listening for future changes.
	 *
	 * This is a convenience for calling the listener manually after registering it.
	 *
	 * @default false
	 */
	immediate?: boolean;
}

export interface EventListenerOptions {
	/**
	 * If true, the listener will be called immediately.
	 *
	 * This is useful for listeners that need to initialize some state,
	 * while still listening for future events.
	 *
	 * This is a convenience for calling the listener manually after registering it.
	 *
	 * @default false
	 */
	immediate?: boolean;
}
