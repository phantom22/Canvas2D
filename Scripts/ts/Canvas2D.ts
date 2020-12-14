class Canvas2D {

	constructor(settings) {
		this.items = [];
		this.events = {};
		this.isPaused = false;
		this._hidePointer = false;
		this.lastEvent = null;
		this.checkSettings(settings);

		this.frameCounter = 0;
		this.startExecution();
	}

	checkSettings(settings) {

		const t = this;

		let {background, items, globalEvents} = settings;
		const canvas = document.getElementById(settings.id);

		t.canvas = () => canvas;
		const context = canvas.getContext("2d");
		t.ctx = context;

		t.globalEvents = globalEvents;

		// forward inheritance to children of canvas
		items.forEach(item => t.registerNewItem(item));

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

		registerEvent = (type: string, itemIndex: number) => {
			if (typeof t.events[type] == "undefined") {
				t.events[type] = [];
				t.canvas().addEventListener(type, t.inputHandler.bind(this));
			}
			
			if (Array.isArray(t.events[type]) && !t.events[type].includes(itemIndex)) {
				t.events[type].push(itemIndex);
			}
		};

		// register canvas events
		t.globalEvents.forEach((event: globalEvent) => {
			registerEvent(event.type, -1);
		});

		// register item events
		t.items.forEach((item, itemIndex) => {
			item.e.forEach((event: Event2D) => {
				registerEvent(event.type, itemIndex);
			});
		});
		
	}

	clearEvents() {
		
	}

	inputHandler(e: Event) {

		this.lastEvent = e;

		const type = e.type,
		      items = this.events[type];

		items.forEach(index => {

			if (index >= 0) {
				this.items[index]
					.filterEvents(type)
					.forEach(event => event.fireIfTriggered())
			}
			else {
				this.globalEvents
					.filter((event: globalEvent) => event.type == type)
					.forEach((event: globalEvent) => event.callback.call(this))
			}

		});

	}

	startExecution() {
		this.orderOfExecution();
	}

	orderOfExecution() {

		this.adaptFrame();
		if (!this.isPaused) this.itemLogic();
		this.drawFrame();
		this.frameCounter++;

		requestAnimationFrame(this.orderOfExecution.bind(this));

	}

	adaptFrame() {

		const canvas = this.canvas(),
			{ innerWidth: windowWidth, innerHeight: windowHeight } = window;

		if (canvas.width != windowWidth || canvas.height != windowHeight) {
			canvas.width = windowWidth;
			canvas.height = windowHeight;

			// update each item bounds
			this.items.forEach(item => item.updateBounds());
		}
	}

	itemLogic() {

		this.items.forEach(item => {

			item.physicStep();
			item.onFrame.call(this, item);

		});

	}

	drawFrame() {
		const {width, height} = this.canvas();
		//this.ctx.fillStyle = this.c.bgColor;
		this.ctx.fillRect(0, 0, width, height);
		this.items.forEach(v => v.renderToCanvas());
	}

	// get item by index
	get i() {
		return this.items;
	}

	togglePointer() {
		const canvas = this.canvas();
		this._hidePointer = this._hidePointer == false ? true : false;

		if (this._hidePointer) canvas.style.cursor = "none";
		else canvas.style.cursor = "";
    }



}

/* 
TODO: enable custom vars for items on start
	  ERROR MESSAGES
      vector item moving??
      add custom global and item methods
*/