class Item2D {
	constructor(item) {

		const t = this, belongsTo = () => this; 


		// item inheritance
		t.belongsTo = item.belongsTo;
		t.origin = item.origin;

		// forward inheritance to properties
		item.shape.belongsTo = belongsTo;
		item.physics.belongsTo = belongsTo;
		item.events.forEach(event => {
			event.belongsTo = belongsTo;
		});


		t.events = [];
		t.isHidden = false;
		t.onFrame = typeof item.onFrame == "function" ? item.onFrame : function(){};

		const {shape,physics,events,onAwake} = item;

		t.pos = item.shape.args.slice(0,2);
		t.shape = new Shape2D(shape);
		t.physics = new Physics2D(physics);

		events.forEach(event => {
			t.events.push(new Event2D(event));
		});

		// on item initialization
		typeof onAwake == "function" ? onAwake.call(t.origin,t) : void 0;

	}

	// POS

	get xy() {
		return this.pos;
	}

	set xy(v) {
		//console.log(v);
		this.x = v[0];
		this.y = v[1];
	}

	get x() {
		return this.pos[0];
	}

	set x(v) {
		this.pos[0] = v;
	}

	get y() {
		return this.pos[1];
	}

	set y(v) {
		this.pos[1] = v;
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

	filterEvents(type) {
		return this.e.filter(v => v.t == type);
	}

	// END OF EVENT

	renderToCanvas() {

		const t = this;

		if (!this.isHidden) {
				
			const dimensions = t.sdf == "arc" ? [t.sc * 2, t.sc * 2] : t.sc;
			this.origin().ctx.drawImage(this.s.i,...this.xy,...dimensions);
			
		}
	}

}