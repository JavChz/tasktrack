(this.webpackJsonptasktracker=this.webpackJsonptasktracker||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a(15)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(5),o=a.n(c),l=(a(12),a(6)),i=a(1),u=(a(13),function(e){return new Date(e).toISOString().substr(11,8)}),s=(a(14),function(e){var t=e.task;return r.a.createElement("div",{className:"singleTask"},r.a.createElement("div",null,t.id),r.a.createElement("div",null,t.name),r.a.createElement("div",null,u(t.duration)),r.a.createElement("div",null,new Date(t.endAt).toLocaleTimeString("en-US")))}),m=function(e){var t=e.archive;return r.a.createElement("div",{className:"taskArchive"},r.a.createElement("div",{className:"singleTask"},r.a.createElement("div",null,"#"),r.a.createElement("div",null,"Name"),r.a.createElement("div",null,"Duration"),r.a.createElement("div",null,"Ended at")),t.slice(0).reverse().map((function(e,t){return r.a.createElement(s,{task:e,key:t})})))};var v=function(){var e=1,t=0,a=[];(localStorage.hasOwnProperty("tasks")||localStorage.hasOwnProperty("timerGlobal")||localStorage.hasOwnProperty("archive"))&&(e=Number(localStorage.getItem("tasks")),t=Number(localStorage.getItem("timerGlobal")),a=JSON.parse(localStorage.getItem("archive"))||[]);var c=Object(n.useState)(a),o=Object(i.a)(c,2),s=o[0],v=o[1],d=Object(n.useState)(""),b=Object(i.a)(d,2),f=b[0],g=b[1],E=Object(n.useState)(Date.now()),k=Object(i.a)(E,2),S=k[0],h=k[1],O=Object(n.useState)(!0),p=Object(i.a)(O,2),w=p[0],j=p[1],N=Object(n.useState)(e),I=Object(i.a)(N,2),T=I[0],y=I[1],C=Object(n.useState)(0),D=Object(i.a)(C,2),A=D[0],J=D[1],B=Object(n.useState)(t),G=Object(i.a)(B,2),P=G[0],x=G[1];Object(n.useEffect)((function(){var e=setInterval((function(){w||J(Date.now()-S)}),1e3);return document.title="".concat(u(A)," | ").concat(T),x((function(){return s.reduce((function(e,t){return e+t.duration}),0)})),function(){clearInterval(e)}}),[S,T,A,w,s]);var R=function(e){return!!e},U=function(e){h(Date.now()),e&&J(0),j(e)};return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"timer"},r.a.createElement("input",{type:"text",value:f,onChange:function(e){g(String(e.target.value))},placeholder:"Name of the Task"}),r.a.createElement("input",{type:"number",value:T,onChange:function(e){y(Number(e.target.value))}}),r.a.createElement("h3",null,"Time in current Task ",u(A)),r.a.createElement("div",null,r.a.createElement("button",{className:"finishTask",onClick:function(){return function(){var e={id:T,name:f,duration:A,endAt:Date.now()};v((function(t){return[].concat(Object(l.a)(t),[e])})),J(0),h(Date.now()),y(T+1),console.log(s),localStorage.setItem("archive",JSON.stringify(s)),localStorage.setItem("timerGlobal",P),localStorage.setItem("tasks",T+1)}()},disabled:R(w)},"Finish current task")),r.a.createElement("div",{className:"toolButtons"},r.a.createElement("button",{onClick:function(){return function(){J(0);var e=s;console.log(e.pop()),v(e),localStorage.setItem("tasks",T-1)}()},disabled:R(T<=1)},"Undo"),w?r.a.createElement("button",{onClick:function(){return U(!1)}},"Start"):r.a.createElement("button",{onClick:function(){return U(!0)}},"Stop"),r.a.createElement("button",{onClick:function(){return localStorage.clear(),h(Date.now()),void J(0)}},"Reset CurrentTask"),r.a.createElement("button",{onClick:function(){return localStorage.clear(),v([]),localStorage.setItem("tasks",1),y(1),J(0),j(!0),void x(0)}},"Reset"))),r.a.createElement("h5",null,"Total Time: ",u(P)," | Average ",P&&u(P/s.length)),r.a.createElement(m,{archive:s}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[7,1,2]]]);
//# sourceMappingURL=main.66fdd7a8.chunk.js.map