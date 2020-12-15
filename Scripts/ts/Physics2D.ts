class Physics2D {

	constructor({ belongsTo, origin, enable = false, acc = [0, 0], gravity = 9.82, bounce = 0, friction = 0, onCollision = function(){} }) {

		const t = this;


		// property inheritance
		t.belongsTo = belongsTo;
		t.origin = origin;

		t.enable = enable;
		t.acc = acc;
		t.gravity = gravity;
		t.bounce = bounce;
		t.friction = friction;
		t.onCollision = onCollision;

		// for now can only be changed during runtime
		t._maxAcc = 3800;

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
		// acceleration cap based on this._maxAcc
		this.acc[0] = Math.abs(v) <= this._maxAcc ? v : this._maxAcc * Math.sign(v);
	}

	get ay() {
		return this.acc[1];
	}

	set ay(v) {
		// acceleration cap based on this._maxAcc
		this.acc[1] = Math.abs(v) <= this._maxAcc ? v : this._maxAcc * Math.sign(v);
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

	hBounce(): void {
		this.ax *= this.b * -1;
	}

	vBounce(): void {
		this.ay *= this.b * -1;
	}

	reverseGravity(): void {
		this.g *= -1; 
	}

	step(): void {

		const t = this,
			item = t.belongsTo(),
			deltaTime = 1 / 60;
		let { y, x } = item,
			{ ay: accelerationY, ax: accelerationX, friction, gravity } = t;

		if (t.enable) {
			item.x += accelerationX * deltaTime;
			item.y += accelerationY * deltaTime + gravity * deltaTime;
			t.ax   *= (1 - friction);
			t.ay   += gravity * deltaTime;
		}

		if (item.isTouchingBounds()) t.onCollision.call(t.origin(), item, this);
        
	}
	
}