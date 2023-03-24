(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(n){if(n.ep)return;n.ep=!0;const t=s(n);fetch(n.href,t)}})();const h="modulepreload",p=function(r,e){return new URL(r,e).href},f={},m=function(e,s,l){if(!s||s.length===0)return e();const n=document.getElementsByTagName("link");return Promise.all(s.map(t=>{if(t=p(t,l),t in f)return;f[t]=!0;const i=t.endsWith(".css"),y=i?'[rel="stylesheet"]':"";if(!!l)for(let c=n.length-1;c>=0;c--){const u=n[c];if(u.href===t&&(!i||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${t}"]${y}`))return;const a=document.createElement("link");if(a.rel=i?"stylesheet":h,i||(a.as="script",a.crossOrigin=""),a.href=t,document.head.appendChild(a),i)return new Promise((c,u)=>{a.addEventListener("load",c),a.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>e())},d=document.querySelector("#log");function o(...r){r.length&&(d.value+=Date.now().toString()+": "),d.value+=r.map(e=>e.toString()).join(`
`),d.value+=`
`}async function w(r,e=Date.now()){await r.initialized(),o(`Sample initialized in ${Date.now()-e}ms`),e=Date.now(),await r.aliceAddressReady(),o(`Alice address ready in ${Date.now()-e}ms`),e=Date.now(),await r.alicaBalanceRetrieved(),o(`Alice balance retrieved in ${Date.now()-e}ms`),e=Date.now(),await r.transferSent(),o(`Transfer sent in ${Date.now()-e}ms`),e=Date.now()}document.querySelector("#polkadot").addEventListener("click",async function(){o(),o("Polkadot");const r=Date.now(),{PolkadotSample:e}=await m(()=>import("./polkadot.sample-7fc7d170.js"),["./polkadot.sample-7fc7d170.js","./pbkdf2-cf996060.js"],import.meta.url);await w(new e,r),o(`Total time: ${Date.now()-r}ms`)},!1);document.querySelector("#sdk").addEventListener("click",async function(){o(),o("SDK");const r=Date.now(),{SdkSample:e}=await m(()=>import("./sdk.sample-e7e72df6.js"),["./sdk.sample-e7e72df6.js","./pbkdf2-cf996060.js"],import.meta.url);await w(new e,r),o(`Total time: ${Date.now()-r}ms`)},!1);
