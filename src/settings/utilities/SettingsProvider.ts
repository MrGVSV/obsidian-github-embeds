import { EventListenerOptions, Settings, SettingsListener, SettingsListenerOptions } from '../types';
import { Component, Plugin } from 'obsidian';
import { DefaultSettings } from '../defaults';
import { WritableDraft } from 'immer/src/types/types-external';
import { produce } from 'immer';
import { isDarkMode } from '../../utilities';

type UnsubFunction = () => void;

export class SettingsProvider extends Plugin {
	private readonly listeners: SettingsListenerMap = new SettingsListenerMap();
	private _settings: Settings = DefaultSettings;

	/**
	 * The current settings.
	 */
	public get settings(): Settings {
		return this._settings;
	}

	/**
	 * Register a callback to be called when the settings change.
	 *
	 * This will automatically unregister the callback when the plugin is unloaded.
	 * However, the returned function can be called to unregister the callback early.
	 *
	 * @returns A function that can be called to unregister the callback.
	 */
	public onSettingsChanged(callback: SettingsListener, options: SettingsListenerOptions = {}): () => void {
		if (options.immediate) {
			callback(null, this.settings);
		}

		const unsub = this.listeners.add(callback);
		this.register(unsub);

		return unsub;
	}

	/**
	 * Register a callback to be called when the CSS changes.
	 *
	 * This will automatically register the listener for the given component,
	 * removing it when the component is unloaded.
	 */
	public onCssChange(
		component: Component,
		callback: (state: { isDarkMode: boolean }) => void,
		options: EventListenerOptions = {},
	) {
		if (options.immediate) {
			callback({
				isDarkMode: isDarkMode(this.app),
			});
		}

		const eventRef = this.app.workspace.on('css-change', () => {
			callback({
				isDarkMode: isDarkMode(this.app),
			});
		});

		component.registerEvent(eventRef);
	}

	async loadSettings() {
		this._settings = Object.assign({}, DefaultSettings, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this._settings);
	}

	/**
	 * Perform a mutation of the current settings.
	 */
	public async modifySettings(recipe: (settings: WritableDraft<Settings>) => void) {
		const prev = this._settings;
		const next = produce(prev, recipe);
		this._settings = next;
		this.listeners.invokeAll(prev, next);
		await this.saveSettings();
	}
}

class SettingsListenerMap {
	private id: number;
	private listeners: Map<number, SettingsListener>;

	constructor() {
		this.id = 0;
		this.listeners = new Map();
	}

	/**
	 * Add a listener to be called when the settings change.
	 */
	public add(listener: SettingsListener): UnsubFunction {
		const id = this.id++;
		this.listeners.set(id, listener);
		return () => {
			this.listeners.delete(id);
		};
	}

	/**
	 * Invoke all registered listeners with the previous and current settings.
	 */
	public invokeAll(prev: Settings | null, next: Settings) {
		this.listeners.forEach((listener) => listener(prev, next));
	}
}
