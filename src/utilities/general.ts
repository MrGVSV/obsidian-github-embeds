/**
 * Run the given function only if the plugin is in development mode.
 */
export function debug<T = void>(f: () => T): T | undefined {
	return window.__DEV__ ? f() : undefined;
}
