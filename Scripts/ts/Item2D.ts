class Item2D {

	constructor({ belongsTo, origin, shape, physics, events, onAwake = function(){}, onFrame = function(){} }) {

		const t = this, forwardBelongsTo = () => this; 


		// item inheritance
		t.belongsTo = belongsTo;
		t.origin = origin;

		// forward inheritance to properties
		shape.belongsTo = forwardBelongsTo;
		physics.belongsTo = forwardBelongsTo;
		events.forEach(event => event.belongsTo = forwardBelongsTo);


		t.events = [];
		t.onFrame = onFrame;
		t.onAwake = onAwake;

		t.pos = shape.args.slice(0,2);
		t.shape = new Shape2D(shape);
		t.physics = new Physics2D(physics);

		events.forEach(event => {
			t.events.push(new Event2D(event));
		});

		t.isHidden = false;
		t._bounds = { x: null, y: null };
		t._lastCollide = [-1, -1];


		// on item initialization
		t.onAwake.call(t.origin, t);

	}

	// POS

	get xy() {
		return this.pos;
	}

	set xy(v) {
		this.x = v[0];
		this.y = v[1];
	}

	get x() {
		return this.pos[0];
	}

	set x(v) {
		const [minX, maxX] = this._bounds.x;
		this.pos[0] = (v < minX) ? minX : (v > maxX) ? maxX : v;
	}

	get y() {
		return this.pos[1];
	}

	set y(v) {
		const [minY, maxY] = this._bounds.y;
		this.pos[1] = (v < minY) ? minY : (v > maxY) ? maxY : v;
	}

	// END POS

	// SHAPE

	get s() {
		return this.shape;
	}

	get sdf() {
		return this.s.df;
	}
 
	get sc() {
		return this.s.c;
	}

	set sc(v) {
		this.s.c = v;
	}

	get scw() {
		return this.s.cw;
	}

	set scw(v) {
		this.s.cw = v;
		this.s.render();
	}

	get sch() {
		return this.s.ch;
	}

	set sch(v) {
		this.s.ch = v;
		this.s.render();
	}

	get scr() {
		return this.s.cr;
	}

	set scr(v) {
		this.s.cr = v;
		this.s.render();
	}

	get shapeCenter() {
		return this.s.center;
	}

	// END SHAPE

	// physics

	get p() {
		return this.physics;
	}

	get pe() {
		return this.p.e;
	}

	set pe(v) {
		this.p.e = v;
	}

	get pa() {
		return this.p.a;
	}

	set pa(v) {
		this.p.a = v;
	}

	get pax() {
		return this.p.ax;
	}

	set pax(v) {
		this.p.ax = v;
	}

	get pay() {
		return this.p.ay;
	}

	set pay(v) {
		this.p.ay = v;
	}

	get pg() {
		return this.p.g;
	}

	set pg(v) {
		this.p.g = v;
	}

	get pb() {
		return this.p.b;
	}

	set pb(v) {
		this.p.b = v;
	}

	get pf() {
		return this.p.f;
	}

	set pf(v) {
		this.p.f = v;
	}

	physicStep() {
		this.p.step();
	}

	// END Of physics

	// EVENT

	get e() {
		return this.events;
	}

	filterEvents(type: string): Event2D[] {
		return this.e.filter(v => v.t == type);
	}

	// END OF EVENT

	renderToCanvas(): void {

		const t = this;

		if (!this.isHidden) {
				
			const dimensions: number[] = t.sdf == "arc" ? [t.sc * 2, t.sc * 2] : t.sc;
			// @ts-ignore
			this.origin().ctx.drawImage(this.s.i, ...this.xy, ...dimensions);
			
		}
	}

	updateBounds(flags: BoundFlags): void {

		const t = this,
			{ x, y } = typeof flags == "undefined" ? { x: true, y: true } : flags,
			{ width: canvasWidth, height: canvasHeight } = t.origin().canvas(),
			isRect = t.sdf == "fillRect";

		if (x) {
			const itemWidth = isRect ? t.scw : t.scr * 2;
			t._bounds.x = [0, canvasWidth - itemWidth];
		}

		if (y) {
			const itemHeight = isRect ? t.sch / 2 : t.scr * 2;
			t._bounds.y = [0, canvasHeight - itemHeight]
		}


	}

	isTouchingBounds(): boolean {

		const [x, y] = this.xy.map(v => Math.floor(v));

		const stateX = this._bounds.x.includes(x),
			  stateY = this._bounds.y.includes(y),
			  canCollide = stateX && this._lastCollide[0] != x || stateY && this._lastCollide[1] != y;

		if (stateX) this.physics.hBounce();
		if (stateY) this.physics.vBounce();

		if (canCollide) this._lastCollide = [x, y];
		else if (!stateX && !stateY) this._lastCollide = [-1, -1];

		return canCollide;

    }

}