(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{105:function(e,t,a){},144:function(e,t,a){},146:function(e,t,a){},147:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(12),r=a.n(c),i=(a(97),a(98),a(22)),s=a(11),o=a(194),l=a(201),u=a(186),j=a(189),b=a(150),d=(a(99),a(4));var h=function(){return Object(d.jsx)("div",{children:Object(d.jsx)(u.a,{position:"static",className:"appBar",children:Object(d.jsx)(j.a,{children:Object(d.jsx)(i.b,{to:{pathname:"/"},children:Object(d.jsx)(b.a,{variant:"h6",children:"Twitch Randomizer"})})})})})},m=a(14),O=a(203),p=a(197),g=a(193),x=a(192),v=a(190),f=a(202),w=a(205),y=a(191);a(105);function S(){return Object(d.jsxs)(b.a,{variant:"body2",color:"textSecondary",align:"center",children:["Copyright \xa9 ",Object(d.jsx)(v.a,{color:"inherit",href:"https://material-ui.com/",children:"Twitch Randomizer"})," ",(new Date).getFullYear()]})}var k=Object(y.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{background:"#9146ff !important",margin:"3px !important"}}}));var N=function(){var e=k(),t=Object(n.useState)(""),a=Object(m.a)(t,2),c=a[0],r=a[1],i=Object(n.useState)(""),l=Object(m.a)(i,2),u=l[0],j=l[1],h=Object(n.useState)("Select..."),v=Object(m.a)(h,2),y=v[0],N=v[1],F=Object(n.useState)(!1),C=Object(m.a)(F,2),E=C[0],T=C[1],B=Object(n.useState)(!1),W=Object(m.a)(B,2),P=W[0],R=W[1],D=function(e){e.preventDefault(),c&&""==u&&j(9999999),"Select..."==y&&N(null),c&&T(!0)};return Object(d.jsxs)(x.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justify:"center",style:{minHeight:"85vh"},children:[E&&Object(d.jsx)(s.a,{push:!0,to:{pathname:"/stream",state:{game:c,viewers:u,language:y}}}),P&&Object(d.jsx)(s.a,{push:!0,to:{pathname:"/results",state:{game:c,viewers:u,language:y}}}),Object(d.jsxs)(g.a,{component:"main",maxWidth:"xs",center:!0,children:[Object(d.jsx)(o.a,{}),Object(d.jsxs)("div",{className:e.paper,children:[Object(d.jsx)(b.a,{component:"h1",variant:"h5",children:"Twitch Randomizer"}),Object(d.jsxs)("form",{className:e.form,onSubmit:D,children:[Object(d.jsx)(w.a,{variant:"outlined",type:"text",margin:"normal",required:!0,fullWidth:!0,id:"game",label:"Game",name:"game",onChange:function(e){return r(e.target.value)},autoFocus:!0}),Object(d.jsx)(w.a,{variant:"outlined",type:"number",margin:"normal",InputProps:{inputProps:{min:"10",max:"9999999"}},fullWidth:!0,id:"viewers",label:"Max Number of Viewers (Minimum: 10)",name:"viewers",value:u,onChange:function(e){return j(e.target.value)},onBlur:function(e){e.target.value<10&&""!=e.target.value?j(10):e.target.value>9999999&&""!=e.target.value?j(9999999):e.target.value>=10&&""!=e.target.value?j(e.target.value):(e.target.value="",j(""))}}),Object(d.jsx)("div",{id:"select",children:Object(d.jsxs)(f.a,{native:!0,variant:"outlined",margin:"normal",fullWidth:!0,id:"language",label:"Language",name:"language",onChange:function(e){return N(e.target.value)},children:[Object(d.jsx)("option",{value:"Select...",children:"Select..."}),Object(d.jsx)("option",{value:"en",children:"English"}),Object(d.jsx)("option",{value:"es",children:"Espa\xf1ol (Spanish)"}),Object(d.jsx)("option",{value:"fr",children:"Fran\xe7ais (French)"}),Object(d.jsx)("option",{value:"de",children:"Deutsch (German)"}),Object(d.jsx)("option",{value:"ja",children:"\u65e5\u672c\u8a9e (Japanese)"}),Object(d.jsx)("option",{value:"it",children:"Italiano (Italian)"}),Object(d.jsx)("option",{value:"pt",children:"Portugu\xeas (Portuguese)"}),Object(d.jsx)("option",{value:"ru",children:"\u0440\u0443\u0441\u0441\u043a\u0438\u0439 (Russian)"}),Object(d.jsx)("option",{value:"nl",children:"Nederlands (Dutch)"}),Object(d.jsx)("option",{value:"tr",children:"T\xfcrk\xe7e (Turkish)"})]})}),Object(d.jsxs)("div",{id:"inputButtons",children:[Object(d.jsx)(p.a,{type:"submit",onClick:D,halfWidth:!0,variant:"contained",color:"primary",className:e.submit,children:"Find A Random Stream"}),Object(d.jsx)(p.a,{onClick:function(e){e.preventDefault(),c&&""==u&&j(9999999),"Select..."==y&&N(null),c&&R(!0)},halfWidth:!0,variant:"contained",color:"primary",className:e.submit,children:"View Results"})]})]})]}),Object(d.jsx)(O.a,{mt:8,children:Object(d.jsx)(S,{})})]})]})},F=a(41),C=a.n(F),E=a(26),T=a(53),B=a(54),W=a.n(B),P=a(55),R=a.n(P),D=a(78),I=a.n(D),_=(a(144),Object(y.a)((function(e){return{submit:{background:"#9146ff !important",margin:"3px !important"}}})));var z=function(e){var t=_(),a=Object(s.f)(),c=Object(n.useState)(e.location.state.game),r=Object(m.a)(c,2),o=r[0],l=(r[1],Object(n.useState)(e.location.state.viewers)),u=Object(m.a)(l,2),j=u[0],b=(u[1],Object(n.useState)(e.location.state.language)),h=Object(m.a)(b,2),O=h[0],x=(h[1],Object(n.useState)(e.location.state.channel)),v=Object(m.a)(x,2),f=v[0],w=(v[1],Object(n.useState)({stream:null,loading:!0,error:null})),y=Object(m.a)(w,2),S=y[0],k=S.stream,N=S.loading,F=S.error,B=y[1];return Object(n.useEffect)((function(){N&&function(){var e=Object(T.a)(C.a.mark((function e(t,a,n){var c;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!f){e.next=5;break}B(Object(E.a)({stream:f,loading:!1},F)),e.next=9;break;case 5:return e.next=7,W.a.get("/api/stream/game=".concat(t,"&viewers=").concat(a,"&language=").concat(n));case 7:c=e.sent,B(Object(E.a)({stream:c.data.user_name,loading:!1},F));case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),B(Object(E.a)(Object(E.a)({},k),{},{loading:!1,error:e.t0}));case 14:case 15:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t,a,n){return e.apply(this,arguments)}}()(o,j,O)}),[k,N,F]),Object(d.jsxs)(g.a,{children:[N&&Object(d.jsx)("div",{id:"loader",children:Object(d.jsx)(R.a,{type:"Puff",color:"#00BFFF",height:100,width:100})}),!N&&k&&Object(d.jsx)(g.a,{id:"stream",children:Object(d.jsx)(I.a,{autoFocus:!0,autoplay:!0,channel:k,layout:"video-with-chat",width:"940",height:"480",onPlay:function(){},onReady:function(){},muted:"false",theme:"dark"})}),!k&&!N&&Object(d.jsx)("div",{id:"streamError",children:Object(d.jsx)("h1",{children:"Error: No stream found"})}),!N&&Object(d.jsxs)("div",{id:"streamButtons",children:[Object(d.jsx)(i.b,{to:{pathname:"/stream",state:{game:o,viewers:j,language:O,channel:null}},onClick:function(){return a.go(0)},children:Object(d.jsx)(p.a,{type:"button",halfWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Find Another Stream"})}),Object(d.jsx)(i.b,{to:{pathname:"/"},children:Object(d.jsx)(p.a,{type:"button",halfWidth:!0,variant:"contained",color:"primary",className:t.submit,children:"Home"})})]})]})},A=a(200),J=a(198),M=a(199),G=a(204),H=(a(145),a(146),Object(y.a)((function(e){return{submit:{background:"#9146ff !important",margin:"3px !important"}}})));var V=function(e){H();var t=Object(n.useState)(e.location.state.game),a=Object(m.a)(t,2),c=a[0],r=(a[1],Object(n.useState)(e.location.state.viewers)),s=Object(m.a)(r,2),o=s[0],l=(s[1],Object(n.useState)(e.location.state.language)),u=Object(m.a)(l,2),j=u[0],b=(u[1],Object(n.useState)({results:[],loading:!0,error:null})),h=Object(m.a)(b,2),O=h[0],p=O.results,x=O.loading,v=O.error,f=h[1],w=Object(n.useState)([]),y=Object(m.a)(w,2),S=(y[0],y[1]),k=Object(n.useState)(1),N=Object(m.a)(k,2),F=N[0],B=N[1],P=50*(F-1),D=Math.ceil(p.length/50),I=p.slice(P,P+50).map((function(e){return Object(d.jsxs)(J.a,{component:i.b,to:{pathname:"/stream",state:{game:c,viewers:o,language:j,channel:e.user_name}},children:[Object(d.jsx)("img",{src:e.thumbnail_url,alt:"Thumbnail"}),Object(d.jsx)(M.a,{title:e.title,subtitle:Object(d.jsxs)("span",{children:[e.user_name," (",e.viewer_count," viewers)"]})})]})}));return Object(n.useEffect)((function(){x&&function(){var e=Object(T.a)(C.a.mark((function e(t,a){var n;return C.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,W.a.get("/api/results/game=".concat(t,"&viewers=").concat(a,"&language=").concat(j));case 3:n=e.sent,console.log(n.data),f(Object(E.a)({results:n.data,loading:!1},v)),S(n.data.slice(P,P+50)),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),f(Object(E.a)(Object(E.a)({},p),{},{loading:!1,error:e.t0}));case 12:case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t,a){return e.apply(this,arguments)}}()(c,o)}),[]),Object(d.jsxs)("div",{children:[x&&Object(d.jsx)("div",{id:"loader",children:Object(d.jsx)(R.a,{type:"Puff",color:"#00BFFF",height:100,width:100})}),0==p.length&&!x&&Object(d.jsx)("div",{id:"resultsError",children:Object(d.jsx)("h1",{children:"Error: No results found"})}),0!=p.length&&!x&&Object(d.jsxs)(g.a,{style:{paddingTop:"50px",paddingBottom:"50px"},children:[Object(d.jsx)(A.a,{container:!0,cols:5,children:I}),Object(d.jsx)("div",{className:"pagination",children:Object(d.jsx)(G.a,{count:D,page:F,onChange:function(e,t){B(t)}})})]})]})};var q=function(){return Object(d.jsx)(l.a,{children:Object(d.jsx)(o.a,{style:{height:"100vh"},children:Object(d.jsx)("div",{className:"App",children:Object(d.jsx)("div",{className:"container",children:Object(d.jsxs)(i.a,{children:[Object(d.jsx)(h,{}),Object(d.jsx)(s.b,{exact:!0,path:"/",render:function(){localStorage.clear()},component:N}),Object(d.jsx)(s.b,{exact:!0,path:"/stream",component:z}),Object(d.jsx)(s.b,{exact:!0,path:"/results",component:V})]})})})})})};r.a.render(Object(d.jsx)(q,{}),document.getElementById("root"))},97:function(e,t,a){},98:function(e,t,a){},99:function(e,t,a){}},[[147,1,2]]]);
//# sourceMappingURL=main.932bb030.chunk.js.map