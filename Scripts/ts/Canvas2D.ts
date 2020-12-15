class Canvas2D {

	constructor(settings: Canvas2DSettings) {

		this.items = [];
		this.events = {};
		this.isPaused = false;
		this.lastEvent = null;
		this.checkSettings(settings);

		this.frameCounter = 0;
		this.startExecution();

	}

	checkSettings({ id, background, items, globalEvents }): void {

		const t = this;

		const canvas = document.getElementById(id);

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

	registerNewItem(item: Item2D): void {

		const origin = () => this

		item.origin = origin;
		item.shape.origin = origin;
		item.physics.origin = origin;
		item.events.forEach(event => event.origin = origin);
		item.belongsTo = () => this;

		this.items.push(new Item2D(item));

	}

	registerNewEvents(): void {

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

	inputHandler(e: Event): void {

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

	startExecution(): void {
		this.orderOfExecution();
	}

	orderOfExecution(): void {

		this.adaptFrame();
		if (!this.isPaused) this.itemLogic();
		this.drawFrame();
		this.frameCounter++;

		requestAnimationFrame(this.orderOfExecution.bind(this));

	}

	adaptFrame(): void {

		const canvas = this.canvas(),
			{ innerWidth: windowWidth, innerHeight: windowHeight } = window;

		if (canvas.width != windowWidth || canvas.height != windowHeight) {
			canvas.width = windowWidth;
			canvas.height = windowHeight;

			// update each item bounds
			this.items.forEach(item => item.updateBounds());
		}
	}

	itemLogic(): void {

		this.items.forEach(item => {

			item.physicStep();
			item.onFrame.call(this, item);

		});

	}

	drawFrame(): void {
		const {width, height} = this.canvas();
		//this.ctx.fillStyle = this.c.bgColor;
		this.ctx.fillRect(0, 0, width, height);
		this.items.forEach(v => v.renderToCanvas());
	}

	// get item by index
	get i() {
		return this.items;
	}

	showMouse(): void {
		this.canvas().style.cursor = "";
	}

	hideMouse(): void {
		this.canvas().style.cursor = "none";
    }



}

/* 
TODO: enable custom vars for items on start
	  ERROR MESSAGES
      vector item moving??
      add custom global and item methods
*/