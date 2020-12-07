class Shape2D {

	constructor(shape) {

		const t = this;


		// property inheritance
		t.belongsTo = shape.belongsTo;
		t.origin = shape.origin;

		let args = shape.args;

		t.preRender = {
			image: document.createElement("canvas"),
			ctx: null,
			draw: {
				function: null,
				args: null
			}
		};

		// shape.ctx
		t.preRender.ctx = t.i.getContext("2d");
		t.preRender.draw.function = shape.function;

		// normalizing draw args to pre render the image in a separate canvas
		t.preRender.draw.args = t.df == "fillRect" ? [0, 0, ...args.slice(2)] : [args[2], args[2], ...args.slice(2)];

		// updates image dimensions,collider and preRender canvas
		t.c = t.df == "fillRect" ? args.slice(2) : args[2];

	}

	get p() {
		return this.preRender;
	}

	get d() {
		return this.preRender.draw;
	}

	get df() {
		return this.preRender.draw.function;
	}

	set df(v) {
		this.preRender.draw.function = v;
	}

	get da() {
		return this.preRender.draw.args;
	}

	set da(v) {
		this.preRender.draw.args = v;
	}

	get i() {
		return this.preRender.image;
	}

	get iw() {
		return this.preRender.image.width;
	}

	set iw(v) {
		this.preRender.image.width = v;
	}

	get ih() {
		return this.preRender.image.height;
	}

	set ih(v) {
		this.preRender.image.height = v;
	}

	get ctx() {
		return this.preRender.ctx;
	}

	get center() {
		const item = this.belongsTo(),
			  [x, y] = item.xy;

		return this.df == "arc" && typeof this.cr != "undefined" ? [x + this.cr, y + this.cr] : void 0;

	}

	get c() {
		return this.df == "fillRect" ? this.boxCollider : this.circleCollider;	
	}

	set c(v: any) {

		if (this.df == "fillRect") {
			this.cw = v;
			this.ch = v;
		}
		else {
			this.cr = v;
		}

		this.render();
	}

	get cw() {
		return this.df == "fillRect" ? this.boxCollider[0] : void 0;
	}

	set cw(v) {

		const t = this;

		if (t.df == "fillRect") {

			// min width set to 1
			v = v > 1 ? v : 1;

			t.boxCollider[0] = v;
			// update draw function args
			t.da[2] = v;
			// update pre-render canvas dimensions
			t.iw = v;

			// update events hitbox width
			t.belongsTo().e.forEach(event => event.h[0] = v);

		}

	}

	get ch() {
		return this.df == "fillRect" ? this.boxCollider[1] : void 0;
	}

	set ch(v) {

		const t = this;

		if (t.df == "fillRect") {

			// min height set to 1
			v = v > 1 ? v : 1;

			t.boxCollider[1] = v;
			// update draw function args
			t.da[3] = v;
			// update pre-render canvas dimensions
			t.ih = v;

			// update events hitbox height
			t.belongsTo().e.forEach(event => event.h[1] = v);

		}

	}

	get cr() {
		return this.df == "arc" ? this.circleCollider : void 0;
	}

	set cr(v) {

		const t = this;

		if (t.df == "arc") {

			const item = t.belongsTo(),
				  prevCenter = t.center;

			// min radius set to 1
			v = v > 1 ? v : 1;

			t.circleCollider = v;

			// update draw function args
			t.da[0] = v + 0.5;
			t.da[1] = v + 0.5;
			t.da[2] = v;
			// update pre-render canvas dimensions
			t.iw = v * 2 + 1.6;
			t.ih = v * 2 + 1.6;

			// preserve circle center after resizing
			if (typeof prevCenter != "undefined") item.xy = [prevCenter[0] - t.cr, prevCenter[1] - t.cr];

			// update events hitbox radius
			item.e.forEach(event => event.h = v);

		}

	}

	render() {

		this.clearImage();
		const ctx = this.ctx;
		ctx.fillStyle = "white";
		ctx.strokeStyle = "white";
		ctx.beginPath();
		ctx[this.df](...this.da);
		ctx.fill();
		ctx.stroke();
		
	}

	clearImage() {
		this.ctx.clearRect(0, 0, this.iw, this.ih);
	}

}