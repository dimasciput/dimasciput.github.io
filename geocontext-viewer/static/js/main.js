function addClass(e,t){e.className+=" "+t}function removeClass(e,t){for(var n=" "+e.className+" ";-1!==n.indexOf(" "+t+" ");)n=n.replace(" "+t+" ","");e.className=n}function isCanvas(e){return e instanceof HTMLCanvasElement}const createChart=(e,t)=>{document.getElementById(e).innerHTML="";let n=[],a=[],o=[];if(t.hasOwnProperty("service_registry_values")&&(n=t.service_registry_values),0===n.length)return;for(let e=0;e<n.length;e++)try{if(!n[e].value)continue;o.push(parseFloat(n[e].value)),a.push(e+1)}catch(e){console.log(e)}new Chartist.Line(`#${e}`,{labels:a,series:[o]},{height:250,showPoint:!1,lineSmooth:!1,axisX:{showGrid:!0,showLabel:!0}})},createRaw=(e,t)=>{let n=document.getElementById(e);n.innerHTML="",n.innerHTML=JSON.stringify(t,null,1)},createTable=(e,t)=>{let n=document.getElementById(e);n.innerHTML="";let a=[];if(t.hasOwnProperty("service_registry_values")&&(a=t.service_registry_values),0!==a.length)for(let e=0;e<a.length;e++)try{const t=a[e].name;let o=a[e].value,l=parseFloat(o);isNaN(l)||(o=l.toFixed(3));let s=document.createElement("div");addClass(s,"row");let r=document.createElement("div");addClass(r,"col-sm-8"),addClass(r,"geocontext-table-name"),r.innerHTML=t,s.appendChild(r);let i=document.createElement("div");addClass(i,"col-sm-4"),addClass(i,"geocontext-table-value"),i.innerHTML=o,s.appendChild(i),n.appendChild(s)}catch(e){console.log(e)}};!function(){let e=document.getElementById("lat"),t=document.getElementById("lon"),n=document.getElementById("fetch-button"),a=document.getElementsByClassName("geocontext-container")[0],o=document.getElementsByClassName("loading-container")[0],l=document.getElementById("geocontext-group-select"),s=document.getElementsByClassName("response-time")[0],r="",i=null,c=null,d="https://a.tiles.mapbox.com/v2/aj.1x1-degrees.json";mapTileKey&&(d="https://api.maptiler.com/maps/streets/256/tiles.json?key="+mapTileKey);let u=new XMLHttpRequest;u.onload=function(){if(200===u.status){c=(new Date).getTime(),o.style.display="none";const e=JSON.parse(u.responseText);if(s.innerHTML=`Response time : ${c-i} ms`,s.style.display="block",a.style.display="block",u.responseText.indexOf("monthly")>-1)createChart("tab3",e);else{let e=document.getElementById("tab3"),t=e.parentNode;e.remove(),addClass(e=document.createElement("div"),"tab-content"),t.appendChild(e),e.id="tab3",e.innerHTML='<div class="error">Data cannot be used for a chart.</div>'}createRaw("geocontext-data",e),createTable("geocontext-table",e),n.disabled=!1}else o.style.display="none",n.disabled=!1,alert("Request failed.  Returned status of "+u.status)};const m=new ol.Map({layers:[new ol.layer.Tile({source:new ol.source.TileJSON({url:d,crossOrigin:"anonymous"})})],target:"map",view:new ol.View({center:[0,0],zoom:2})});let p=null;const y=(e,t=!1)=>{if(!p){(p=new ol.Feature({geometry:new ol.geom.Point([0,0])})).setStyle(new ol.style.Style({image:new ol.style.Icon({anchor:[.5,135],anchorXUnits:"fraction",anchorYUnits:"pixels",scale:.3,src:"static/location-pointer.png"})}));let e=new ol.layer.Vector({source:new ol.source.Vector({features:[p]})});m.addLayer(e)}p.getGeometry().setCoordinates(e),t&&m.getView().animate({center:e,zoom:5,duration:300})},g=new Geocoder("nominatim",{provider:"osm",lang:"en",placeholder:"Search for ...",limit:5,debug:!1,autoComplete:!0,keepOpen:!0,preventDefault:!0});m.addControl(g);let v=n=>{let a=t.value,o=e.value;if(a&&o){let e=ol.proj.transform([a,o],"EPSG:4326","EPSG:3857");y(e,!0)}},f=e=>{13===e.keyCode&&v()};e.addEventListener("focusout",v),t.addEventListener("focusout",v),e.addEventListener("keyup",f),t.addEventListener("keyup",f),t.value=23.55,e.value=-30.55,v(),g.on("addresschosen",function(n){n.bbox?m.getView().fit(n.bbox,{duration:500}):m.getView().animate({zoom:14,center:n.coordinate}),window.setTimeout(function(){let a=ol.proj.transform(n.coordinate,"EPSG:3857","EPSG:4326");t.value=a[0].toFixed(4),e.value=a[1].toFixed(4),y(n.coordinate)},500)}),m.on("click",function(n){let a=ol.proj.transform(n.coordinate,"EPSG:3857","EPSG:4326");t.value=a[0].toFixed(4),e.value=a[1].toFixed(4),y(n.coordinate)}),n.addEventListener("click",function(){this.disabled=!0,o.style.display="block",a.style.display="none",s.style.display="none";let n=t.value,c=e.value;r=l.querySelector(".selected").dataset.value,i=(new Date).getTime(),u.open("GET",`https://geocontext.kartoza.com/api/v1/geocontext/value/group/${n}/${c}/${r}`),u.send()});const h=e=>{const t=e.target.getAttribute("data-for"),n=document.getElementById(t),a=n.parentElement.querySelectorAll(".active");[].forEach.call(a,function(e){e.classList.remove("active")}),[].forEach.call(e.target.parentElement.querySelectorAll(".active"),function(e){e.classList.remove("active")}),addClass(e.target,"active"),addClass(n,"active"),"true"===n.dataset.chart&&void 0!==n.__chartist__&&n.__chartist__.update()};Array.from(document.getElementsByClassName("tab-option")).forEach(function(e){e.addEventListener("click",h)})}();