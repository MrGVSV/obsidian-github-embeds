import { App, EventRef, Vault } from 'obsidian';

/** The {@link Vault} properties not exposed by Obsidian */
interface SecretVault extends Vault {
	getConfig(key: 'theme'): Theme;
}

/** The possible themes in Obsidian */
type Theme =
	// Dark
	| 'obsidian'
	// Light
	| 'moonstone'
	// System (Dark or Light)
	| 'system';

/**
 * Returns true if the theme is currently set to `Dark`,
 * or if set to `System` and the system is set to dark mode.
 */
export function isDarkMode(app: App): boolean {
	const theme = (app.vault as SecretVault).getConfig('theme');

	if (theme === 'system') {
		return matchMedia('(prefers-color-scheme: dark)').matches;
	}

	return theme === 'obsidian';
}

/**
 * Register a CSS change listener.
 *
 * @param app The app
 * @param callback A callback with a boolean indicating whether the theme is dark or not.
 *
 * @returns An {@link EventRef} that can be used to unregister the listener.
 */
export function onCssChange(app: App, callback: (isDarkMode: boolean) => void): EventRef {
	return app.workspace.on('css-change', () => {
		callback(isDarkMode(app));
	});
}
