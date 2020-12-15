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
	canvas(): HTMLElement,
	ctx: CanvasRenderingContext2D,
	items: Item2D[],
	events: object,
	globalEvents: globalEvent[],
	lastEvent: Event,
	isPaused: boolean,
	frameCounter: number,

	checkSettings(settings: object): void,
	registerNewItem(item: Item2D): void,
	registerNewEvents(): void,
	clearEvents(): void,
	inputHandler(e: Event): void,
	startExecution(): void,
	orderOfExecution(): void,
	adaptFrame(): void,
	itemLogic(): void,
	drawFrame(): void,
	showMouse(): void,
	hideMouse(): void
}

type Canvas2DSettings = {
	id: string,
	background: string,
	items: Item2D[],
	globalEvents: object[]
}

type globalEvent = {
	type: string,
	callback(): void
}

interface Item2D {
	belongsTo(): Canvas2D,
	origin(): Canvas2D,

	events: Event2D[],
	onFrame(): void,
	onAwake(): void,
	pos: number[],
	shape: Shape2D,
	physics: Physics2D,

	isHidden: boolean,
	_bounds: ItemBounds,
	_lastCollide: number[],

	filterEvents(type: string): Event2D[],
	renderToCanvas(): void,
	updateBounds(flags?: BoundFlags): void,
	isTouchingBounds(pos: number[]): boolean
}

type ItemBounds = {
	x: number[],
	y: number[]
}

type BoundFlags = {
	x?: boolean,
	y?: boolean
}

interface Shape2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,

	preRender: preRender,
	boxCollider: number[],
	circleCollider: number,
	render(): void,
	clearImage(): void
}

type preRender = {
	image: HTMLElement,
	ctx: CanvasRenderingContext2D,
	draw: {
		function: string,
		args: number[]
	}
}

interface Physics2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,

	enable: boolean,
	acc: number[],
	gravity: number,
	bounce: number,
	friction: number,
	onCollision(): void,
	_maxAcc: number

	hBounce(): void,
	vBounce(): void,
	reverseGravity(): void,
	step(): void,
}

interface Event2D {
	belongsTo(): Item2D,
	origin(): Canvas2D,

	type: string,
	hitbox: number | number[],
	assist: number,
	offset: number,
	callback(): void,

	checkMouse(): boolean,
	fireIfTriggered(): void
}