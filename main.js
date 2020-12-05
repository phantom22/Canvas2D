alert("this is a simple visualization of the project!");

const C = new Canvas2D({

	id:"abc",
	background:"white",
	globalEvents: [
		{type:"mouseup",callback(){this.i.filter(item => item.open).forEach(item => item.open = false)}}
	],

	items:[
		
		{
			shape: {function:"arc", args:[50,50,50,0,Math.PI*2]},
			/*colors: {fill,stroke}*/
			physics: {enable:true,acc:[5,0],gravity:0.2,friction:0.003,bounce:0.3},
			events: [
				{type:"mousedown", assist: 15, callback(i,e){i.open = true}}
			],
			// on every tenth frame
			onFrame(i) {if (i.open) {i.scr = i.scr + 15 > 100 ? 100 : i.scr + 15} else {i.scr = i.scr - 30 < 50 ? 50 : i.scr - 30}},
			onAwake(i) {console.log("on awake")}
		} 

	]

});

// item custom vars
// global custom vars
// item custom methods
// global custom methods