class Shape2D{constructor(e){const t=this;t.belongsTo=e.belongsTo,t.origin=e.origin;let r=e.args;t.preRender={image:document.createElement("canvas"),ctx:null,draw:{}},t.preRender.ctx=t.i.getContext("2d"),t.preRender.draw.function=e.function,t.preRender.draw.args="fillRect"==t.df?[0,0,...r.slice(2)]:[r[2],r[2],...r.slice(2)],t.c="fillRect"==t.df?r.slice(2):r[2]}get p(){return this.preRender}get d(){return this.preRender.draw}get df(){return this.preRender.draw.function}set df(e){this.preRender.draw.function=e}get da(){return this.preRender.draw.args}set da(e){this.preRender.draw.args=e}get i(){return this.preRender.image}get iw(){return this.preRender.image.width}set iw(e){this.preRender.image.width=e}get ih(){return this.preRender.image.height}set ih(e){this.preRender.image.height=e}get ctx(){return this.preRender.ctx}get center(){const e=this.belongsTo(),[t,r]=e.xy;return"arc"==this.df&&void 0!==this.cr?[t+this.cr,r+this.cr]:void 0}get c(){return"fillRect"==this.df?this.boxCollider:this.circleCollider}set c(e){"fillRect"==this.df?(this.cw=e,this.ch=e):this.cr=e,this.render()}get cw(){return"fillRect"==this.df?this.boxCollider[0]:void 0}set cw(e){const t=this;"fillRect"==t.df&&(e=e>1?e:1,t.boxCollider[0]=e,t.da[2]=e,t.iw=e,t.belongsTo().e.forEach(t=>t.h[0]=e))}get ch(){return"fillRect"==this.df?this.boxCollider[1]:void 0}set ch(e){const t=this;"fillRect"==t.df&&(e=e>1?e:1,t.boxCollider[1]=e,t.da[3]=e,t.ih=e,t.belongsTo().e.forEach(t=>t.h[1]=e))}get cr(){return"arc"==this.df?this.circleCollider:void 0}set cr(e){const t=this;if("arc"==t.df){const r=t.belongsTo(),i=t.center;e=e>1?e:1,t.circleCollider=e,t.da[0]=e+.5,t.da[1]=e+.5,t.da[2]=e,t.iw=2*e+1.6,t.ih=2*e+1.6,void 0!==i&&(r.xy=[i[0]-t.cr,i[1]-t.cr]),r.e.forEach(t=>{t.h=e})}}render(){this.clearImage();const e=this.ctx;e.fillStyle="white",e.strokeStyle="white",e.beginPath(),e[this.df](...this.da),e.fill(),e.stroke()}clearImage(){this.ctx.clearRect(0,0,this.iw,this.ih)}}