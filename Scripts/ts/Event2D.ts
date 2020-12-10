class Event2D {

	constructor(event) {

		const t = this/*, supportedEvents = ["mousedown","mouseup","dblclick","mousemove"], itemIndex = event.itemIndex*/;


		// property inheritance
		t.belongsTo =  event.belongsTo;
		t.origin = event.origin;


		const {type, callback} = event; let {hitbox, assist, offset} = event;
		t.type = type;

		// customizable hitbox
		if (typeof hitbox == "undefined") hitbox = t.belongsTo().sc;

		t.hitbox = hitbox;
		t.assist = typeof assist != "number" ? 0 : assist;
		t.offset = typeof offset != "number" ? 0 : offset;
		t.callback = callback;

	}

	get t() {
		return this.type;
	}

	set t(v) {
		this.type = v;
	}

	get h() {
		return this.hitbox;
	}

	set h(v) {
		this.hitbox = v;
	}

	get hw() {
		return this.belongsTo().sdf == "fillRect" ? this.hitbox[0] : void 0;
	}

	set hw(v) {
		if (this.belongsTo().sdf == "fillRect") this.hitbox[0] = v
	}

	get hh() {
		return this.belongsTo().sdf == "fillRect" ? this.hitbox[1] : void 0;
	}

	set hh(v) {
		if (this.belongsTo().sdf == "fillRect") this.hitbox[1] = v
	}

	get hr() {
		return this.belongsTo().sdf == "arc" ? this.hitbox : void 0;
	}

	set hr(v) {
		if (this.belongsTo().sdf == "arc") this.hitbox = v
	}

	get a() {
		return this.assist;
	}

	set a(v) {
		this.assist = v;
	}

	get c() {
		return this.callback;
	}

	set c(v) {
		this.callback = v;
	}

	get o() {
		return this.offset;
	}

	set o(v) {
		this.offset = v;
	}

	checkMouse() {
		const origin = this.origin(),
			item = this.belongsTo(),
			event = origin.lastEvent,
			mouse = [event.clientX, event.clientY],
			{ assist, hw: hitboxWidth, offset, hh: hitboxHeight, hr: hitboxRadius } = this;

		if (this.belongsTo().sdf == "fillRect") {
			// triggerBox
			const [minX, maxX, minY, maxY] = [
				...[ -assist, (hitboxWidth + assist) ].map(v => v + offset + item.x),
				...[ -assist, (hitboxHeight + assist) ].map(v => v + offset + item.y)
			];
			return minX < mouse[0] && maxX > mouse[0] && minY < mouse[1] && maxY > mouse[1];
		}
		else {
			const center = item.shapeCenter.map(v => v + offset),
				  // @ts-ignore
				  radius = hitboxRadius + assist;

			return Math.sqrt((mouse[0] - center[0]) ** 2 + (mouse[1] - center[1]) ** 2) <= radius;
		} 
	}

	checkIfTriggered() {

		const origin = this.origin();

		if (typeof origin.lastEvent != "undefined" && this.checkMouse()) {

			// Canvas2D, Item2D, Event2D
			this.c.call(origin, this.belongsTo(), this);

		}

	}
}