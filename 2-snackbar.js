import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as s}from"./assets/vendor-A92OCY9B.js";document.querySelector(".form").addEventListener("submit",function(i){i.preventDefault();const t=parseInt(this.elements.delay.value,10),o=this.elements.state.value;new Promise((e,r)=>{setTimeout(()=>{o==="fulfilled"?e(t):r(t)},t)}).then(e=>{s.success({title:"Success",message:`✅ Fulfilled promise in ${e}ms`,position:"topRight"})}).catch(e=>{s.error({title:"Error",message:`❌ Rejected promise in ${e}ms`,position:"topRight"})})});
//# sourceMappingURL=2-snackbar.js.map
