alert("this is a simple visualization of the project!");

const C = new Canvas2D({

	id:"canvas",
	background:"white",
	globalEvents: [
		{type:"mousedown",callback(){this.hideMouse()}},
		{type:"mouseup",callback(){this.i.filter(item => item.open).forEach(item => item.open = false);this.showMouse()}}
	],

	items:[
		
		{
			shape: {function:"arc", args:[50,50,50,0,Math.PI*2]},
			/*colors: {fill,stroke}*/
			physics: {enable:true, acc:[2500,130], gravity:15, friction:0.003, bounce:1, onCollision:function(i){console.log("collision with borders")} },
			events: [
				{type:"mousedown", assist: 15, callback(i,e){i.open = true;  i.pa = [0,0];}},
				{type:"mousemove", callback(){/*needed to update lastEvent mouse position*/}}
			],

			onFrame(i) {if (i.open) {i.scr = i.scr + 15 > 100 ? 100 : i.scr + 15; i.x = this.lastEvent.clientX - i.scr; i.y = this.lastEvent.clientY - i.scr;} else {i.scr = i.scr - 30 < 50 ? 50 : i.scr - 30}},
			onAwake(i) {console.log("on awake")}
		} 

	]

});

// item custom vars
// global custom vars
// item custom methods
// global custom methods