class Physics2D {

	constructor(physics) {

		const t = this;


		// property inheritance
		t.belongsTo = physics.belongsTo;
		t.origin = physics.origin;


		let {enable,acc,gravity,bounce,friction} = physics;

		t.enable = typeof enable == "undefined" ? false : enable;
		t.acc = typeof acc == "undefined" ? [0,0] : acc;
		t.gravity = typeof gravity == "undefined" ? 9.82 : gravity;
		t.bounce = typeof bounce == "undefined" ? 0 : bounce;
		t.friction = typeof friction == "undefined" ? 0 : friction;

	}

	get e() {
		return this.enable;
	}

	set e(v) {
		this.enable = v;
	}

	get a() {
		return this.acc;
	}

	set a(v) {
		this.acc = v;
	}

	get ax() {
		return this.acc[0];
	}

	set ax(v) {
		this.acc[0] = v;
	}

	get ay() {
		return this.acc[1];
	}

	set ay(v) {
		this.acc[1] = v;
	}

	get g() {
		return this.gravity;
	}

	set g(v) {
		this.gravity = v;
	}

	get b() {
		return this.bounce;
	}

	set b(v) {
		this.bounce = v;
	}

	get f() {
		return this.friction;
	}

	set f(v) {
		this.friction = v;
	}

	hBounce() {
		this.ax *= this.b * -1;
	}

	vBounce() {
		this.ay *= this.b * -1;
	}

	reverseGravity() {
		this.g *= -1;
	}

	step() {

		const t = this,
			  item = t.belongsTo(),
		      step = 1 / 60;

		if (t.e) {
			item.y += t.ay + t.g * step;
			t.ay += t.g * step;
			item.x += t.ax;
			t.ax *= (1 - t.f);
		}

	}
	
}