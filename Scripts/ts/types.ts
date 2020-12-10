interface HTMLElement {
	getContext(context: string): CanvasRenderingContext2D,
	height,
	width
}

interface CanvasRenderingContext2D {
	[key: string]: any
}

interface Event {
	clientX,
	clientY
}

interface Canvas2D {
	items: Item2D[],
	events: object,
	isPaused: boolean,
	lastEvent: Event,
	frameCounter: number,
	canvas(): HTMLElement,
	globalEvents: object[],
	ctx: CanvasRenderingContext2D
}

interface Physics2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	enable: boolean,
	acc: number[],
	gravity: number,
	bounce: number,
	friction: number
}

interface Shape2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	preRender: preRender,
	boxCollider: number[],
	circleCollider: number,
}

interface Event2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	type: string,
	hitbox: number | number[],
	assist: number,
	offset: number,
	callback()
}

interface Item2D {
	belongsTo(): Canvas2D,
	origin(): Canvas2D,

	shape: Shape2D,
	physics: Physics2D,
	events: Event2D[],

	pos: number[],
	isHidden: Boolean,
	_bounds: ItemBounds,
	onFrame(),
	updateBounds(flags?: BoundFlags)
}

interface ItemBounds {
	x: number[],
	y: number[]
}

interface BoundFlags {
	x?: boolean,
	y?: boolean
}

interface globalEvent {
	type: string,
	callback()
}

interface preRender {
	image: HTMLElement,
	ctx: CanvasRenderingContext2D,
	draw: preRenderDraw
}

interface preRenderDraw {
	function: string,
	args: number[]
}