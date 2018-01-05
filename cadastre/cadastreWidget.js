!function(){"use strict";L.Google=L.Class.extend({includes:L.Mixin.Events,options:{minZoom:0,maxZoom:18,tileSize:256,subdomains:"abc",errorTileUrl:"",attribution:"",opacity:1,continuousWorld:!1,noWrap:!1,mapOptions:{backgroundColor:"#dddddd"}},initialize:function(t,e){L.Util.setOptions(this,e),this._ready=google&&void 0!==google.maps.Map,this._ready||L.Google.asyncWait.push(this),this._type=t||"SATELLITE"},onAdd:function(t,e){this._map=t,this._insertAtTheBottom=e,this._initContainer(),this._initMapObject(),t.on("viewreset",this._reset,this),this._limitedUpdate=L.Util.limitExecByInterval(this._update,150,this),t.on("move",this._update,this),t.on("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="20px",this._reset(),this._update()},onRemove:function(t){t._container.removeChild(this._container),t.off("viewreset",this._reset,this),t.off("move",this._update,this),t.off("zoomanim",this._handleZoomAnim,this),t._controlCorners.bottomright.style.marginBottom="0em"},getAttribution:function(){return this.options.attribution},setOpacity:function(t){this.options.opacity=t,1>t&&L.DomUtil.setOpacity(this._container,t)},setElementSize:function(t,e){t.style.width=e.x+"px",t.style.height=e.y+"px"},_initContainer:function(){var t=this._map._container,e=t.firstChild;this._container||(this._container=L.DomUtil.create("div","leaflet-google-layer leaflet-top leaflet-left"),this._container.id="_GMapContainer_"+L.Util.stamp(this),this._container.style.zIndex="auto"),t.insertBefore(this._container,e),this.setOpacity(this.options.opacity),this.setElementSize(this._container,this._map.getSize())},_initMapObject:function(){if(this._ready){this._google_center=new google.maps.LatLng(0,0);var t=new google.maps.Map(this._container,{center:this._google_center,zoom:0,tilt:0,mapTypeId:google.maps.MapTypeId[this._type],disableDefaultUI:!0,keyboardShortcuts:!1,draggable:!1,disableDoubleClickZoom:!0,scrollwheel:!1,streetViewControl:!1,styles:this.options.mapOptions.styles,backgroundColor:this.options.mapOptions.backgroundColor}),e=this;this._reposition=google.maps.event.addListenerOnce(t,"center_changed",function(){e.onReposition()}),this._google=t,google.maps.event.addListenerOnce(t,"idle",function(){e._checkZoomLevels()}),google.maps.event.addListenerOnce(t,"tilesloaded",function(){e.fire("load")}),this.fire("MapObjectInitialized",{mapObject:t})}},_checkZoomLevels:function(){void 0!==this._map.getZoom()&&this._google.getZoom()!==this._map.getZoom()&&this._map.setZoom(this._google.getZoom())},_reset:function(){this._initContainer()},_update:function(){if(this._google){this._resize();var t=this._map.getCenter(),e=new google.maps.LatLng(t.lat,t.lng);this._google.setCenter(e),void 0!==this._map.getZoom()&&this._google.setZoom(Math.round(this._map.getZoom())),this._checkZoomLevels()}},_resize:function(){var t=this._map.getSize();(this._container.style.width!==t.x||this._container.style.height!==t.y)&&(this.setElementSize(this._container,t),this.onReposition())},_handleZoomAnim:function(t){var e=t.center,o=new google.maps.LatLng(e.lat,e.lng);this._google.setCenter(o),this._google.setZoom(Math.round(t.zoom))},onReposition:function(){this._google&&google.maps.event.trigger(this._google,"resize")}}),L.Google.asyncWait=[],L.Google.asyncInitialize=function(){var t;for(t=0;t<L.Google.asyncWait.length;t++){var e=L.Google.asyncWait[t];e._ready=!0,e._container&&(e._initMapObject(),e._update())}L.Google.asyncWait=[]},function(){function t(){var t={},e=document.URL.toString(),o=e.substring(e.lastIndexOf("?")+1).split(/\&/);return o.map(function(e){var o=e.split(/\=/);t[o[0]]=o[1]}),t}L.GoogleAdv=L.Control.extend({options:{id:"google",position:"gmxbottomcenter",insert:'<ins class="adsbygoogle" style="display:inline-block;width:320px;height:100px" data-ad-client="ca-pub-3088886844438889" data-ad-slot="8884609976"></ins>',url:"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"},onAdd:function(){var t=L.DomUtil.create("div","leaflet-google");t.innerHTML=this.options.insert;var e=document.createElement("script");return e.setAttribute("charset","UTF-8"),e.setAttribute("src",this.options.url),t.insertBefore(e,t.firstChild),e=document.createElement("script"),e.innerHTML="(adsbygoogle = window.adsbygoogle || []).push({});",t.appendChild(e),t}}),L.googleAdv=function(t){return new L.GoogleAdv(t)},document.writeln('<div id="cadastreWidget"></div>');var e=document.getElementById("cadastreWidget"),o=t(),i=o.bl||"osm",n=(o.CAD_NUM||o.cad||o.cadNum,o.x||36.62858426570892),a=o.y||55.481092412215894,s=o.z||18,r=new L.Map(e,{layers:[],center:[a,n],zoom:s});L.DomUtil.addClass(e,"leaflet-mapWidget");var l={OSM:L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{maxZoom:23,maxNativeZoom:18,attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}),Google:new L.Google},c=window.nsGmx.cadastre.afterViewer({},r);c.addTo(r),L.control.layers(l,{"Кадастр":c},{collapsed:!L.Browser.mobile,autoZIndex:!1}).addTo(r),r.addLayer("osm"===i?l.OSM:l.Google),r.addControl(new L.Control.gmxIcon({id:"locateMe",text:"Позиция",title:"Определить мое положение"}).on("click",function(){r.locate({setView:!0})})),r.addControl(new L.Control.gmxIcon({id:"getWidget",text:"Виджет",title:"Получить код для вставки на свой сайт"}).on("click",function(){var t='<div id="cadastreWidget" style="width: 800px; height: 680px;"><script src="http://russian-face.ru/cadastre/addWidget.js"></script></div>';window.prompt("Скопируйте текст:",t)}));var d=L.googleAdv();r.addControl(d),r.addControl(new L.Control.gmxIcon({id:"advert",text:"Реклама",togglable:!0,isActive:!0,title:"Включить/Отключить рекламу"}).on("statechange",function(t){t.target.options.isActive?r.addControl(d):r.removeControl(d)}))}()}();