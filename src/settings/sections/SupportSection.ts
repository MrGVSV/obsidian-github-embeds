import { BaseSection } from './BaseSection';
import { sanitizeHTMLToDom, Setting } from 'obsidian';

export class SupportSection extends BaseSection {
	protected title(): string | undefined {
		return 'Support';
	}

	protected onload(): void {
		const desc = new DocumentFragment();
		desc.appendText('If you like this plugin, consider buying me a coffee!');
		desc.createEl('br');
		desc.createEl('br');
		desc.append(
			sanitizeHTMLToDom(`
				<a href="https://www.buymeacoffee.com/ginov">
					<img alt="" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=ginov&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" />
				</a>
			`),
		);

		new Setting(this.containerEl).setDesc(desc);
	}
}
