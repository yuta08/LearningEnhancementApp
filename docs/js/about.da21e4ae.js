"use strict";(self["webpackChunklearning_enhancement_app"]=self["webpackChunklearning_enhancement_app"]||[]).push([[443],{6528:function(t,s,e){e.r(s),e.d(s,{default:function(){return P}});var a=e(1096),n=e(1828),r=e(3058),i=e(4437),o=(e(9027),e(1884),e(144));function l(t){return o.ZP.extend({name:`v-${t}`,functional:!0,props:{id:String,tag:{type:String,default:"div"}},render(s,{props:e,data:a,children:n}){a.staticClass=`${t} ${a.staticClass||""}`.trim();const{attrs:r}=a;if(r){a.attrs={};const t=Object.keys(r).filter((t=>{if("slot"===t)return!1;const s=r[t];return t.startsWith("data-")?(a.attrs[t]=s,!1):s||"string"===typeof s}));t.length&&(a.staticClass+=` ${t.join(" ")}`)}return e.id&&(a.domProps=a.domProps||{},a.domProps.id=e.id),s(e.tag,a,n)}})}var d=e(2653),c=l("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render(t,{props:s,data:e,children:a}){let n;const{attrs:r}=e;return r&&(e.attrs={},n=Object.keys(r).filter((t=>{if("slot"===t)return!1;const s=r[t];return t.startsWith("data-")?(e.attrs[t]=s,!1):s||"string"===typeof s}))),s.id&&(e.domProps=e.domProps||{},e.domProps.id=s.id),t(s.tag,(0,d.ZP)(e,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(n||[])}),a)}}),m=e(4192),u=e(248),p=e(1908),g=e(7833),f=e(2810),y=e(3551),b=e(5294),h=e(2680),Z=e(5617),v=function(){var t=this,s=t._self._c;return s(a.Z,{attrs:{id:"inspire"}},[s(y.Z,[s(c,{staticClass:"py-8 px-6",attrs:{fluid:""}},[s(b.Z,t._l(t.cards,(function(e){return s(i.Z,{key:e,attrs:{cols:"12"}},[s(r.Z,[s(h.Z,[t._v(t._s(e))]),s(u.Z,{attrs:{"two-line":""}},[t._l(t.messages,(function(e,a){return[s(p.Z,{key:a},[s(g.Z,{attrs:{color:"grey darken-1"}}),s(f.km,[s(f.oZ,{staticClass:"message"},[t._v(" "+t._s(e.message)+" ")])],1)],1),6!==t.n?s(m.Z,{key:`divider-${a}`,attrs:{inset:""}}):t._e()]}))],2)],1)],1)})),1)],1),s(Z.Z,{staticClass:"mx-2",attrs:{"append-icon":"mdi-comment",label:"メッセージを送信",rows:"3","auto-grow":""},model:{value:t.body,callback:function(s){t.body=s},expression:"body"}}),s(n.Z,{staticClass:"me-4",attrs:{type:"submit",disabled:t.invalid},on:{click:t.submit}},[t._v(" submit ")]),s(n.Z,{on:{click:t.clear}},[t._v(" clear ")])],1)],1)},_=[],k=(e(541),{data:()=>({messages:[{message:"message 1"},{message:"message 2"},{message:"message 3"},{message:"message 4"},{message:"message 5"}],body:"",user_id:"",cards:["Today"],drawer:null,links:[["mdi-inbox-arrow-down","Inbox"],["mdi-send","Send"],["mdi-delete","Trash"],["mdi-alert-octagon","Spam"]]}),computed:{invalid(){return console.log("invalid call"),!this.body}},methods:{clear(){console.log("clear call."),this.body=""},submit(){console.log("submit call.",this.body),this.messages.unshift({message:this.body}),this.body=""}}}),C=k,w=e(1001),x=(0,w.Z)(C,v,_,!1,null,"c58d18d2",null),P=x.exports}}]);
//# sourceMappingURL=about.da21e4ae.js.map