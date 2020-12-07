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
	items: Array<Item2D>,
	events: object,
	isPaused: boolean,
	lastEvent: Event,
	frameCounter: number,
	canvas(): HTMLElement,
	globalEvents: Array<object>,
	ctx: CanvasRenderingContext2D
}

interface Physics2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	enable: boolean,
	acc: Array<number>,
	gravity: number,
	bounce: number,
	friction: number
}

interface Shape2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	preRender: preRender,
	boxCollider: Array<number>,
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
	events: Array<Event2D>,

	pos: Array<number>
	isHidden: Boolean,
	onFrame()
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
	args: Array<number>
}