import { BaseSection } from './BaseSection';
import { DisplayLocation } from '../types';
import { DefaultSettings } from '../defaults';
import { ResettableSetting } from '../utilities';

export class IssueSection extends BaseSection {
	protected title(): string | undefined {
		return 'Issues';
	}

	protected onload(): void {
		const { containerEl, plugin } = this;

		new ResettableSetting(containerEl)
			.setName('Enable')
			.setDesc('Enable the embedding of issues and pull requests.')
			.addResettableToggle(
				(toggle) => {
					toggle.setValue(plugin.settings.embedIssues).onChange(async (value) => {
						await plugin.modifySettings((settings) => {
							settings.embedIssues = value;
						});
					});
				},
				() => DefaultSettings.embedIssues,
			);

		new ResettableSetting(containerEl)
			.setName('Label Display')
			.setDesc('Determines how labels are displayed in embeds.')
			.addResettableDropdown(
				(dropdown) => {
					dropdown
						.addOptions({
							preview: 'Display in preview',
							inside: 'Display in dropdown',
							none: "Don't display",
						} satisfies Record<DisplayLocation, string>)
						.setValue(plugin.settings.labelDisplay)
						.onChange(async (value) => {
							await plugin.modifySettings((settings) => {
								settings.labelDisplay = value as DisplayLocation;
							});
						});
				},
				() => DefaultSettings.labelDisplay as string,
			);

		const dateDesc = new DocumentFragment();
		dateDesc.appendText('The date format to use when displaying issue dates.');
		dateDesc.createEl('br');
		dateDesc.createEl('br');
		dateDesc.createEl('strong', { text: 'Sample:' });
		dateDesc.createEl('br');
		const dateSample = dateDesc.createSpan();
		new ResettableSetting(containerEl)
			.setName('Date Format')
			.setDesc(dateDesc)
			.addResettableMomentFormat(
				(component) => {
					component
						.setDefaultFormat('MMMM D, YYYY')
						.setValue(plugin.settings.dateFormat)
						.setSampleEl(dateSample)
						.onChange(async (value) => {
							await plugin.modifySettings((settings) => {
								settings.dateFormat = value || DefaultSettings.dateFormat;
							});
						});
				},
				() => DefaultSettings.dateFormat,
			);

		new ResettableSetting(containerEl)
			.setName('Show Total Comments')
			.setDesc('If enabled, displays the total number of comments on the issue or pull request.')
			.addResettableToggle(
				(toggle) => {
					toggle.setValue(plugin.settings.showTotalComments).onChange(async (value) => {
						await plugin.modifySettings((settings) => {
							settings.showTotalComments = value;
						});
					});
				},
				() => DefaultSettings.showTotalComments,
			);
	}
}
