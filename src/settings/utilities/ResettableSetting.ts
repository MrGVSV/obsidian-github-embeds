import {
	DropdownComponent,
	MomentFormatComponent,
	Setting,
	TextComponent,
	ToggleComponent,
	ValueComponent,
} from 'obsidian';

/**
 * An extension of {@link Setting} that adds methods that add a reset button
 * to the setting component.
 */
export class ResettableSetting extends Setting {
	public addResettableDropdown<T extends string = string>(
		cb: (component: DropdownComponent) => unknown,
		onReset: (component: DropdownComponent) => T,
	): this {
		return super.addDropdown((component) => {
			this.addReset<string, DropdownComponent>(component, onReset);
			cb(component);
		});
	}

	public addResettableToggle(
		cb: (component: ToggleComponent) => unknown,
		onReset: (component: ToggleComponent) => boolean,
	): this {
		return super.addToggle((component) => {
			this.addReset(component, onReset);
			cb(component);
		});
	}

	public addResettableText(
		cb: (component: TextComponent) => unknown,
		onReset: (component: TextComponent) => string,
	): this {
		return super.addText((component) => {
			this.addReset(component, onReset);
			cb(component);
		});
	}

	public addResettableMomentFormat(
		cb: (component: MomentFormatComponent) => unknown,
		onReset: (component: MomentFormatComponent) => string,
	): this {
		return super.addMomentFormat((component) => {
			this.addReset(component, onReset);
			cb(component);
		});
	}

	private addReset<T, V extends ValueComponent<T>>(component: V, onReset: (component: V) => T): V {
		this.addExtraButton((button) => {
			button
				.setIcon('reset')
				.setTooltip('Restore default')
				.onClick(() => {
					component.setValue(onReset(component));

					// Handle components that don't register a change event when set programmatically
					if (component instanceof DropdownComponent) {
						component.selectEl.dispatchEvent(new Event('change'));
					} else if (component instanceof MomentFormatComponent) {
						component.onChanged();
					}
				});
		});

		return component;
	}
}
