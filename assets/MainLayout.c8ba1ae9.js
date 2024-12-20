import{c as C,i as G,e as R,p as D,a as h,h as g,d as J,g as L,l as N,f as X,w as _,o as T,j as q,n as V,k as Y,m as E,q as Z,r as ee,s as p,t as A,u as F,v as P,x,y as te,z as ne,A as oe,B as ie,C as le,D as re,E as k,F as B}from"./index.47190c3f.js";var ae=C({name:"QPageContainer",setup(t,{slots:m}){const{proxy:{$q:n}}=L(),e=G(N,R);if(e===R)return console.error("QPageContainer needs to be child of QLayout"),R;D(X,!0);const r=h(()=>{const a={};return e.header.space===!0&&(a.paddingTop=`${e.header.size}px`),e.right.space===!0&&(a[`padding${n.lang.rtl===!0?"Left":"Right"}`]=`${e.right.size}px`),e.footer.space===!0&&(a.paddingBottom=`${e.footer.size}px`),e.left.space===!0&&(a[`padding${n.lang.rtl===!0?"Right":"Left"}`]=`${e.left.size}px`),a});return()=>g("div",{class:"q-page-container",style:r.value},J(m.default))}});const{passive:M}=E,se=["both","horizontal","vertical"];var ce=C({name:"QScrollObserver",props:{axis:{type:String,validator:t=>se.includes(t),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(t,{emit:m}){const n={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let e=null,r,a;_(()=>t.scrollTarget,()=>{l(),f()});function c(){e!==null&&e();const v=Math.max(0,Z(r)),y=ee(r),u={top:v-n.position.top,left:y-n.position.left};if(t.axis==="vertical"&&u.top===0||t.axis==="horizontal"&&u.left===0)return;const z=Math.abs(u.top)>=Math.abs(u.left)?u.top<0?"up":"down":u.left<0?"left":"right";n.position={top:v,left:y},n.directionChanged=n.direction!==z,n.delta=u,n.directionChanged===!0&&(n.direction=z,n.inflectionPoint=n.position),m("scroll",{...n})}function f(){r=Y(a,t.scrollTarget),r.addEventListener("scroll",i,M),i(!0)}function l(){r!==void 0&&(r.removeEventListener("scroll",i,M),r=void 0)}function i(v){if(v===!0||t.debounce===0||t.debounce==="0")c();else if(e===null){const[y,u]=t.debounce?[setTimeout(c,t.debounce),clearTimeout]:[requestAnimationFrame(c),cancelAnimationFrame];e=()=>{u(y),e=null}}}const{proxy:d}=L();return _(()=>d.$q.lang.rtl,c),T(()=>{a=d.$el.parentNode,f()}),q(()=>{e!==null&&e(),l()}),Object.assign(d,{trigger:i,getPosition:()=>n}),V}});function ue(){const t=p(!A.value);return t.value===!1&&T(()=>{t.value=!0}),t}const K=typeof ResizeObserver!="undefined",W=K===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var j=C({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(t,{emit:m}){let n=null,e,r={width:-1,height:-1};function a(l){l===!0||t.debounce===0||t.debounce==="0"?c():n===null&&(n=setTimeout(c,t.debounce))}function c(){if(n!==null&&(clearTimeout(n),n=null),e){const{offsetWidth:l,offsetHeight:i}=e;(l!==r.width||i!==r.height)&&(r={width:l,height:i},m("resize",r))}}const{proxy:f}=L();if(K===!0){let l;const i=d=>{e=f.$el.parentNode,e?(l=new ResizeObserver(a),l.observe(e),c()):d!==!0&&F(()=>{i(!0)})};return T(()=>{i()}),q(()=>{n!==null&&clearTimeout(n),l!==void 0&&(l.disconnect!==void 0?l.disconnect():e&&l.unobserve(e))}),V}else{let d=function(){n!==null&&(clearTimeout(n),n=null),i!==void 0&&(i.removeEventListener!==void 0&&i.removeEventListener("resize",a,E.passive),i=void 0)},v=function(){d(),e&&e.contentDocument&&(i=e.contentDocument.defaultView,i.addEventListener("resize",a,E.passive),c())};const l=ue();let i;return T(()=>{F(()=>{e=f.$el,e&&v()})}),q(d),f.trigger=a,()=>{if(l.value===!0)return g("object",{style:W.style,tabindex:-1,type:"text/html",data:W.url,"aria-hidden":"true",onLoad:v})}}}}),de=C({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:t=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(t.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(t,{slots:m,emit:n}){const{proxy:{$q:e}}=L(),r=p(null),a=p(e.screen.height),c=p(t.container===!0?0:e.screen.width),f=p({position:0,direction:"down",inflectionPoint:0}),l=p(0),i=p(A.value===!0?0:P()),d=h(()=>"q-layout q-layout--"+(t.container===!0?"containerized":"standard")),v=h(()=>t.container===!1?{minHeight:e.screen.height+"px"}:null),y=h(()=>i.value!==0?{[e.lang.rtl===!0?"left":"right"]:`${i.value}px`}:null),u=h(()=>i.value!==0?{[e.lang.rtl===!0?"right":"left"]:0,[e.lang.rtl===!0?"left":"right"]:`-${i.value}px`,width:`calc(100% + ${i.value}px)`}:null);function z(o){if(t.container===!0||document.qScrollPrevented!==!0){const s={position:o.position.top,direction:o.direction,directionChanged:o.directionChanged,inflectionPoint:o.inflectionPoint.top,delta:o.delta.top};f.value=s,t.onScroll!==void 0&&n("scroll",s)}}function U(o){const{height:s,width:b}=o;let w=!1;a.value!==s&&(w=!0,a.value=s,t.onScrollHeight!==void 0&&n("scrollHeight",s),H()),c.value!==b&&(w=!0,c.value=b),w===!0&&t.onResize!==void 0&&n("resize",o)}function I({height:o}){l.value!==o&&(l.value=o,H())}function H(){if(t.container===!0){const o=a.value>l.value?P():0;i.value!==o&&(i.value=o)}}let S=null;const O={instances:{},view:h(()=>t.view),isContainer:h(()=>t.container),rootRef:r,height:a,containerHeight:l,scrollbarWidth:i,totalWidth:h(()=>c.value+i.value),rows:h(()=>{const o=t.view.toLowerCase().split(" ");return{top:o[0].split(""),middle:o[1].split(""),bottom:o[2].split("")}}),header:x({size:0,offset:0,space:!1}),right:x({size:300,offset:0,space:!1}),footer:x({size:0,offset:0,space:!1}),left:x({size:300,offset:0,space:!1}),scroll:f,animate(){S!==null?clearTimeout(S):document.body.classList.add("q-body--layout-animate"),S=setTimeout(()=>{S=null,document.body.classList.remove("q-body--layout-animate")},155)},update(o,s,b){O[o][s]=b}};if(D(N,O),P()>0){let b=function(){o=null,s.classList.remove("hide-scrollbar")},w=function(){if(o===null){if(s.scrollHeight>e.screen.height)return;s.classList.add("hide-scrollbar")}else clearTimeout(o);o=setTimeout(b,300)},$=function(Q){o!==null&&Q==="remove"&&(clearTimeout(o),b()),window[`${Q}EventListener`]("resize",w)},o=null;const s=document.body;_(()=>t.container!==!0?"add":"remove",$),t.container!==!0&&$("add"),te(()=>{$("remove")})}return()=>{const o=ne(m.default,[g(ce,{onScroll:z}),g(j,{onResize:U})]),s=g("div",{class:d.value,style:v.value,ref:t.container===!0?void 0:r,tabindex:-1},o);return t.container===!0?g("div",{class:"q-layout-container overflow-hidden",ref:r},[g(j,{onResize:I}),g("div",{class:"absolute-full",style:y.value},[g("div",{class:"scroll",style:u.value},[s])])]):s}}});const ve=oe({__name:"MainLayout",setup(t){return p(!1),(m,n)=>{const e=ie("router-view");return le(),re(de,{view:"lHh Lpr lFf"},{default:k(()=>[B(ae,null,{default:k(()=>[B(e)]),_:1})]),_:1})}}});export{ve as default};
