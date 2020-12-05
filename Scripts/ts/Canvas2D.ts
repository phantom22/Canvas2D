class Canvas2D {

	constructor(settings) {
		this.items = [];
		this.events = {};
		this.isPaused = false;
		this.lastEvent = void 0;
		this.checkSettings(settings);

		this.frameCounter = 0;
		this.startExecution();
	}

	checkSettings(settings) {

		const t = this;

		let {background,items,globalEvents} = settings;
		const canvas = document.getElementById(settings.id);

		t.canvas = () => canvas;
		const context = canvas.getContext("2d");
		t.ctx = context;

		t.globalEvents = globalEvents;

		// forward inheritance to children of canvas
		items.forEach(item => {

			/*item.origin = () => this;
			item.shape.origin = origin;
			item.physics.origin = origin;
			item.events.forEach(event => event.origin = origin);
			item.belongsTo = () => this;*/

			t.registerNewItem(item);

		});

		/*if (typeof items == "object" && Array.isArray(items)) {
			items.forEach(item => {
				t.items.push(new Item2D(item));
			});
		}*/


		// TODO BACKGROUND

		t.registerNewEvents();
		t.adaptFrame();

	}

	registerNewItem(item) {

		const origin = () => this

		item.origin = origin;
		item.shape.origin = origin;
		item.physics.origin = origin;
		item.events.forEach(event => event.origin = origin);
		item.belongsTo = () => this;

		this.items.push(new Item2D(item));

	}

	registerNewEvents() {

		const t = this,

		// TODO clear current event listeners

		registerEvent = (type,itemIndex) => {
			if (typeof t.events[type] == "undefined") {
				t.events[type] = [];
				t.canvas().addEventListener(type, t.inputHandler.bind(this));
			}
			
			if (Array.isArray(t.events[type]) && !t.events[type].includes(itemIndex)) {
				t.events[type].push(itemIndex);
			}
		};

		// register canvas events
		t.globalEvents.forEach(event => {
			registerEvent(event.type,-1);
		});

		// register item events
		t.items.forEach((item,itemIndex) => {
			item.e.forEach(event => {
				registerEvent(event.type,itemIndex);
			});

		});
		
	}

	clearEvents() {
		// TODO
	}

	inputHandler(e) {

		this.lastEvent = e;

		const type = e.type,
		      items = this.events[type];

		items.forEach(index => {

			if (index >= 0) {
				const item = this.i[index];
				item.filterEvents(type).forEach(event => event.checkIfTriggered());
			}
			else {
				//console.log(this.globalEvents.filter(event => event.type == type))
				this.globalEvents.filter(event => event.type == type).forEach(event => event.callback.call(this))
			}

		});

	}

	startExecution() {
		this.orderOfExecution();
	}

	orderOfExecution() {

		this.adaptFrame();

		if (!this.isPaused) {

			this.itemLogic();

		}

		this.drawFrame();

		requestAnimationFrame(this.orderOfExecution.bind(this));

		this.frameCounter++;
	}

	adaptFrame() {
		const c = this.canvas(), iW = window.innerWidth, iH = window.innerHeight;

		if (c.width != iW || c.height != iH) {
			c.width = iW;
			c.height = iH;
		}
	}

	itemLogic() {
		this.items.forEach(item => {item.physicStep(); item.onFrame.call(this,item)});
	}

	drawFrame() {
		const {width,height} = this.canvas();
		//this.ctx.fillStyle = this.c.bgColor;
		this.ctx.fillRect(0, 0, width, height);
		this.items.forEach(v => v.renderToCanvas());
	}

	// get item by index
	get i() {
		return this.items;
	}

}

/* 
TODO: enable custom vars for items on start
	  ERROR MESSAGES
      vector item moving??
      add custom global and item methods
*/