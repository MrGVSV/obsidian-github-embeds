import { Component, sanitizeHTMLToDom } from 'obsidian';
import { nanoid } from 'nanoid';
import { sanitizeHtml } from '../../utilities';
import { SettingsProvider } from '../../settings';

type Ctor1 = [parent: Shard, tag: keyof HTMLElementTagNameMap, o?: DomElementInfo | string];
type Ctor2 = [parent: Shard, create: (parent: Readonly<HTMLElement>) => HTMLElement];
type Ctor3 = [
	parent: HTMLElement,
	settings: SettingsProvider,
	tag: keyof HTMLElementTagNameMap,
	o?: DomElementInfo | string,
];
type Ctor4 = [parent: HTMLElement, settings: SettingsProvider, create: (parent: Readonly<HTMLElement>) => HTMLElement];

type Ctor = Ctor1 | Ctor2 | Ctor3 | Ctor4;

/**
 * An extended version of Obsidian's {@link Component} class.
 *
 * A `Shard` features a single DOM element as its root and uses the component lifecycle to manage it.
 *
 * It also provides a few convenience methods for creating DOM elements and other shards.
 */
export class Shard extends Component {
	/** The root element of this shard. */
	public readonly element: HTMLElement;
	/** The parent element of this shard. */
	public readonly parent: HTMLElement;
	/** The settings provider for this shard. */
	public readonly settings: SettingsProvider;

	private readonly _debugId: string;
	private children: Set<Component> = new Set();

	/** A unique identifier for this shard. */
	public get debugId(): string {
		return this._debugId;
	}

	/**
	 * Creates a new shard.
	 * @param parent The parent shard to attach to.
	 * @param tag The tag name of the root element.
	 * @param o Optional DOM element configuration.
	 */
	constructor(parent: Shard, tag: keyof HTMLElementTagNameMap, o?: DomElementInfo | string);
	/**
	 * Creates a new shard.
	 * @param parent The parent shard to attach to.
	 * @param create A function to creates the root element of the shard.
	 */
	constructor(parent: Shard, create: (parent: Readonly<HTMLElement>) => HTMLElement);
	/**
	 * Creates a new shard.
	 * @param parent The parent element to attach to.
	 * @param settings The settings provider for this shard.
	 * @param tag The tag name of the root element.
	 * @param o Optional DOM element configuration.
	 */
	constructor(
		parent: HTMLElement,
		settings: SettingsProvider,
		tag: keyof HTMLElementTagNameMap,
		o?: DomElementInfo | string,
	);
	/**
	 * Creates a new shard.
	 * @param parent The parent element to attach to.
	 * @param settings The settings provider for this shard.
	 * @param create A function to creates the root element of the shard.
	 */
	constructor(
		parent: HTMLElement,
		settings: SettingsProvider,
		create: (parent: Readonly<HTMLElement>) => HTMLElement,
	);
	constructor(...args: Ctor) {
		super();

		this._debugId = nanoid();

		if (args[0] instanceof Shard) {
			const [parent, tagOrCreate, options] = args as Ctor1 | Ctor2;

			this.parent = parent.element;
			this.settings = parent.settings;

			this.element =
				typeof tagOrCreate === 'function'
					? tagOrCreate(this.parent)
					: this.parent.createEl(tagOrCreate, options);
		} else {
			const [parent, settings, tagOrCreate, options] = args as Ctor3 | Ctor4;

			this.parent = parent;
			this.settings = settings;

			this.element =
				typeof tagOrCreate === 'function'
					? tagOrCreate(this.parent)
					: this.parent.createEl(tagOrCreate, options);
		}

		// Detach the element from the DOM until the component is loaded.
		this.element.detach();

		this.oninit();
	}

	/**
	 * Called from the constructor when the shard is first created.
	 *
	 * Note that this will be called after the constructor for the {@link Shard} class.
	 * This means that in inheritor classes, it will be invoked when `super()` is called.
	 */
	protected oninit() {}

	override onload() {
		super.onload();

		this.parent.append(this.element);
	}

	override onunload() {
		super.onunload();

		this.element.detach();
	}

	override addChild<T extends Component>(component: T): T {
		if (component instanceof Shard) {
			this.element.appendChild(component.element);
		}

		this.children.add(component);
		return super.addChild(component);
	}

	override removeChild<T extends Component>(component: T): T {
		if (component instanceof Shard) {
			component.element.detach();
		}

		this.children.delete(component);
		return super.removeChild(component);
	}

	/**
	 * Removes all child components and DOM elements from this shard.
	 */
	public empty() {
		for (const child of this.children) {
			this.removeChild(child);
		}
		this.element.empty();
	}

	/**
	 * Creates a new DOM element and appends it to this shard.
	 *
	 * @param tag The tag name of the element.
	 * @param o Optional DOM element configuration.
	 * @param callback An optional callback to run after the element is created.
	 */
	public createEl<K extends keyof HTMLElementTagNameMap>(
		tag: K,
		o?: DomElementInfo | string,
		callback?: (el: HTMLElementTagNameMap[K]) => void,
	): HTMLElementTagNameMap[K] {
		return this.element.createEl(tag, o, callback);
	}

	/**
	 * Creates a new {@link Shard} and appends it to this shard.
	 *
	 * @param tag The tag name of the element.
	 * @param o Optional DOM element configuration.
	 * @param callback An optional callback to run after the element is created.
	 */
	public createShard<K extends keyof HTMLElementTagNameMap>(
		tag: K,
		o?: DomElementInfo | string,
		callback?: (el: HTMLElementTagNameMap[K]) => void,
	): Shard {
		return this.addChild(new Shard(this.element, this.settings, (parent) => parent.createEl(tag, o, callback)));
	}

	/**
	 * Creates a new {@link Shard} from a stringified HTML fragment and appends it to this shard.
	 * @param html The HTML fragment to parse.
	 * @param tag The tag name of the container element for the HTML fragment.
	 * @param o Optional DOM element configuration.
	 * @param callback An optional callback to run after the element is created.
	 */
	public insertHtml<K extends keyof HTMLElementTagNameMap>(
		html: string,
		tag: K,
		o?: DomElementInfo | string,
		callback?: (el: HTMLElementTagNameMap[K]) => void,
	): Shard {
		const shard = this.createShard(tag, o, callback);
		shard.element.append(sanitizeHTMLToDom(html));

		sanitizeHtml(shard);

		return shard;
	}

	/**
	 * Sets the tooltip for this user;
	 */
	public withTooltip(tooltip: string | null): this {
		this.element.ariaLabel = tooltip;
		return this;
	}

	/**
	 * Returns true if this shard has any child nodes.
	 */
	public hasChildNodes(): boolean {
		return this.element.hasChildNodes();
	}
}
