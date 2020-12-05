interface HTMLElement {
	getContext(context: String): Object,
	height,
	width
}

interface Canvas2D {
	items: Array<Item2D>,
	events: Object,
	isPaused: Boolean,
	lastEvent: lastEvent,
	frameCounter: number,
	canvas: Function,
	globalEvents,
	ctx
}

interface Physics2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	enable: Boolean,
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
	circleCollider: number
}

interface Event2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,
	type: String,
	hitbox: any,
	assist: number,
	offset: number,
	callback: Function
}

interface Item2D {
	belongsTo(): Canvas2D,
	origin(): Canvas2D,
	events: Array<Event2D>,
	isHidden: Boolean,
	onFrame: Function,
	pos: Array<number>,
	shape: Shape2D,
	physics: Physics2D
}

interface preRender {
	image: HTMLElement,
	ctx,
	draw
}

interface lastEvent {
	target: HTMLElement,
	clientX: number,
	clientY: number
}