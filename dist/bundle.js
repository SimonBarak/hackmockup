(()=>{"use strict";const e=document.getElementById("mockup"),t=document.getElementById("initial-slide"),n=document.getElementById("contorlers");document.querySelector(".imageInput").addEventListener("change",(o=>{console.log(o);const{files:d}=o.target;Array.from(d).forEach((o=>{var d=new FileReader;d.onload=o=>{(o=>{let d=document.createElement("video");d.defaultMuted=!0,d.setAttribute("type","video/mp4"),d.setAttribute("src",o),d.setAttribute("width","720"),d.load(),d.play(),d.setAttribute("loop","true");let l=document.createElement("div");l.classList.add("slide"),l.appendChild(d),e.appendChild(l),e.removeChild(t),n.classList.add("hidden")})(o.target.result)},d.readAsDataURL(o)}))}));document.getElementById("bg-color").addEventListener("input",(function(e){const{value:t}=e.target;console.log(t);const n=document.querySelector(":root");console.log(t),n.style.setProperty("--bg-color",t)}),!1),function(e){var t=0,n=0,o=0,d=0;function l(e){(e=e||window.event).preventDefault(),o=e.clientX,d=e.clientY,document.onmouseup=u,document.onmousemove=c}function c(l){(l=l||window.event).preventDefault(),t=o-l.clientX,n=d-l.clientY,o=l.clientX,d=l.clientY,e.style.top=e.offsetTop-n+"px",e.style.left=e.offsetLeft-t+"px"}function u(){document.onmouseup=null,document.onmousemove=null}document.getElementById(e.id+"-handler")?document.getElementById(e.id+"-handler").onmousedown=l:e.onmousedown=l}(document.getElementById("draggable"))})();