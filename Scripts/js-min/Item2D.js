class Item2D{constructor(s){const t=this,e=()=>this;t.belongsTo=s.belongsTo,t.origin=s.origin,s.shape.belongsTo=e,s.physics.belongsTo=e,s.events.forEach(s=>{s.belongsTo=e}),t.events=[],t.isHidden=!1,t.onFrame="function"==typeof s.onFrame?s.onFrame:function(){};const{shape:i,physics:r,events:h,onAwake:n}=s;t.pos=s.shape.args.slice(0,2),t.shape=new Shape2D(i),t.physics=new Physics2D(r),h.forEach(s=>{t.events.push(new Event2D(s))}),"function"==typeof n&&n.call(t.origin,t)}get xy(){return this.pos}set xy(s){this.x=s[0],this.y=s[1]}get x(){return this.pos[0]}set x(s){this.pos[0]=s}get y(){return this.pos[1]}set y(s){this.pos[1]=s}get s(){return this.shape}get sdf(){return this.s.df}get sc(){return this.s.c}set sc(s){this.s.c=s}get scw(){return this.s.cw}set scw(s){this.s.cw=s,this.s.render()}get sch(){return this.s.ch}set sch(s){this.s.ch=s,this.s.render()}get scr(){return this.s.cr}set scr(s){this.s.cr=s,this.s.render()}get shapeCenter(){return this.s.center}get p(){return this.physics}get pe(){return this.p.e}set pe(s){this.p.e=s}get pa(){return this.p.a}set pa(s){this.p.a=s}get pax(){return this.p.ax}set pax(s){this.p.ax=s}get pay(){return this.p.ay}set pay(s){this.p.ay=s}get pg(){return this.p.g}set pg(s){this.p.g=s}get pb(){return this.p.b}set pb(s){this.p.b=s}get pf(){return this.p.f}set pf(s){this.p.f=s}physicStep(){this.p.step()}get e(){return this.events}filterEvents(s){return this.e.filter(t=>t.t==s)}renderToCanvas(){const s=this;if(!this.isHidden){const t="arc"==s.sdf?[2*s.sc,2*s.sc]:s.sc;this.origin().ctx.drawImage(this.s.i,...this.xy,...t)}}}