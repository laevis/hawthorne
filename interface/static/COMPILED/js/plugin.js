var g=g||{};g.scope={};g.findInternal=function(b,a,h){b instanceof String&&(b=String(b));for(var d=b.length,c=0;c<d;c++){var f=b[c];if(a.call(h,f,c,b))return{i:c,v:f}}return{i:-1,v:void 0}};g.ASSUME_ES5=!1;g.ASSUME_NO_NATIVE_MAP=!1;g.ASSUME_NO_NATIVE_SET=!1;g.defineProperty=g.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,a,h){b!=Array.prototype&&b!=Object.prototype&&(b[a]=h.value)};
g.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};g.global=g.getGlobal(this);g.polyfill=function(b,a){if(a){var h=g.global;b=b.split(".");for(var d=0;d<b.length-1;d++){var c=b[d];c in h||(h[c]={});h=h[c]}b=b[b.length-1];d=h[b];a=a(d);a!=d&&null!=a&&g.defineProperty(h,b,{configurable:!0,writable:!0,value:a})}};g.polyfill("Array.prototype.find",function(b){return b?b:function(a,b){return g.findInternal(this,a,b).v}},"es6","es3");
g.polyfill("Array.from",function(b){return b?b:function(a,b,d){b=null!=b?b:function(c){return c};var c=[],f="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];if("function"==typeof f){a=f.call(a);for(var k=0;!(f=a.next()).done;)c.push(b.call(d,f.value,k++))}else for(f=a.length,k=0;k<f;k++)c.push(b.call(d,a[k],k));return c}},"es6","es3");
(function(){$(function(){return b()});var b=function(a){a=void 0===a?document:a;$('[data-trigger="[dropdown/toggle]"]',a).off("click");$('[data-trigger="[dropdown/toggle]"]',a).on("click",function(){$(".expand").not($(".expand",this.parentElement)).slideUp();$(".menu > ul > li > a").not($(this)).removeClass("navActive");$(this).toggleClass("navActive");$(".expand",this.parentElement).slideToggle()});$("[data-trigger='[modal/open]']",a).off("click");$("[data-trigger='[modal/open]']",a).on("click",
function(){$(".overlay").fadeIn("fast");$("[data-component='"+this.getAttribute("data-trigger-target")+"']").fadeIn("fast")});$("[data-trigger='[server/item]']",a).off("click");$("[data-trigger='[server/item]']",a).on("click",function(){$(this).toggleClass("toggableListActive");$(this).find(".content").fadeToggle("fast")});$("[data-trigger='[modal/close]']",a).off("click");$("[data-trigger='[modal/close]']",a).on("click",function(){var c;$(".overlay").fadeOut("fast");for(c=this.parentElement;!$(c).hasClass("modal");)c=
c.parentElement;$(c).fadeOut("fast")});$(".overlay",a).off("click");$(".overlay",a).on("click",function(){$(".overlay").fadeOut("fast");$(".modal").fadeOut("fast")});$("[data-trigger='[system/messages/open]']",a).off("click");$("[data-trigger='[system/messages/open]']",a).on("click",function(){$(".notificationsArea",this).fadeToggle("fast");$($("a",this)[0]).toggleClass("userMenuActive")});$(".searchOverlay",a).off("click");$(".searchOverlay",a).on("click",function(){$(".searchOverlay").fadeOut("fast");
$(".searchArea").fadeOut("fast");$(".search").animate({width:"20%"},250)});$('[data-trigger="[announcement/expand]"]',a).off("click");$('[data-trigger="[announcement/expand]"]',a).on("click",function(){$(".announcement-expand",this).slideToggle()});$('[data-trigger="[user/toggle]"]',a).off("click");$('[data-trigger="[user/toggle]"]',a).on("click",function(){$(".dropdown",this).fadeToggle("fast")});$(".search input",a).off("click");$(".search input",a).on("click",function(){$(".modal").fadeOut("fast");
$(".searchOverlay").fadeIn("fast");$(".searchArea").fadeToggle("fast");$(".search").animate({width:"30%"},250)});$(".timeTable tbody tr td .checkmarkContainer",a).off("mousedown");$(".timeTable tbody tr td .checkmarkContainer",a).on("mousedown",function(){$(this.parentElement.parentElement).toggleClass("logSelected");$(".checkboxDialogue").not($(".checkboxDialogue",this.parentElement)).fadeOut("fast");$("input",this)[0].checked?$(".checkboxDialogue",this.parentElement).fadeOut("fast"):$(".checkboxDialogue",
this.parentElement).fadeIn("fast")});$(".timeTable tbody tr td .checkboxDialogue .paginationTabsDanger",a).off("click");$(".timeTable tbody tr td .checkboxDialogue .paginationTabsDanger",a).on("click",function(){$(this.parentElement).fadeOut("fast");var c=$(this).parent("tbody")[0];$("tr.logSelected",c).removeClass("logSelected");$("input:checked",c).forEach(function(c){return c.checked=!1})});var b=function(){var c=$(this).parent("._Dynamic_Select");var a=$("._Dynamic_Layer",c);c.toggleClass("_Dynamic_Select_Activated");
$("._Select",c).toggleClass("selected");a.toggleClass("selected");a.hasClass("selected")&&(a.on("click",function(a){b.call(this);var f=new MouseEvent(a.type,a);a=document.elementFromPoint(a.clientX,a.clientY);a.matches("input")&&a.focus();c=$(this).parent("._Dynamic_Select");$("._Title",c)[0]!==a&&a.dispatchEvent(f);return $(this).off("click")}),$("._Select_Search input",c)[0].focus())};$('[data-trigger="[composer/select/open]"]',a).off("click");$('[data-trigger="[composer/select/open]"]',a).on("click",
b);var d=[];$('[data-trigger="[composer/select/choose]"]',a).off("click");$('[data-trigger="[composer/select/choose]"]',a).on("click",function(){if($("._Title",$(this).parent("._Dynamic_Select"))[0].hasAttribute("data-select-multiple")){var c=$(this).find("p").text();var a=$(this).find(".checkmarkContainer input");if(a.is(":checked"))for(a.prop("checked",!1),a=0;a<d.length;){if(d[a]===c){d.splice(a,1);break}a+=1}else a.prop("checked",!0),d.push(c);$(this).closest("._Dynamic_Select").find("._Title").text("("+
d.length+") selections")}else c=$(this).parent("._Dynamic_Select"),c.toggleClass("_Dynamic_Select_Activated"),$("._Select",c).toggleClass("selected"),$("._Dynamic_Layer",c).toggleClass("selected"),$("._Title",c)[0].textContent=$("p",this)[0].textContent,$("._Value",c)[0].value=this.getAttribute("data-value")});$('[data-trigger="[composer/select/steam]"]',a).off("keyup");$('[data-trigger="[composer/select/steam]"]',a).on("keyup",function(){var a=this.value;var f=this.hasAttribute("data-email");var b=
/^(?:https:\/\/)?steamcommunity\.com\/profiles\/(\d+)$/i.exec(a);var d=/^(?:https:\/\/)?steamcommunity\.com\/id\/(.+)$/i.exec(a);var e=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.exec(a);var h={"X-CSRFToken":window.csrftoken};if(SteamIDConverter.isSteamID(a)||SteamIDConverter.isSteamID3(a))a=SteamIDConverter.toSteamID64(a);else if(b)a=b[1];else if(d)a=d[1];else if(f&&e)return;b=d?JSON.stringify({steam:a}):
SteamIDConverter.isSteamID64(a)?JSON.stringify({steam64:a}):f&&e?JSON.stringify({email:a}):JSON.stringify({local:a});var l=$(this).parent("._Dynamic_Select");$("._Loading",l).addClass("selected");$("._Container",l)[0].innerHTML="";return window.endpoint.ajax.utils.search.post(h,b,function(a,c){$("._Container",l)[0].innerHTML=c.data;$("._Loading",l).removeClass("selected");window._.init($("._Container",l)[0])})});$('[data-trigger="[composer/select/search]"]',a).off("keyup");$('[data-trigger="[composer/select/search]"]',
a).on("keyup",function(a){var c=[];var b=this.value;var d=$(this).parent("._Select");d=$("._Container",d);$("p",d).forEach(function(a){c.push(a)});if(""===this.value)c.forEach(function(a){return $(a).parent("li")[0].style.display="block"});else if(!(90<=a.which||48>=a.which)){var e=[];c.forEach(function(a){$(a).parent("li")[0].style.display="none";return e.push([a,distance(a.textContent,b)])});e.sort(function(a,c){return c[1]-a[1]});e=e.slice(0,5);e.forEach(function(a){return $(a[0]).parent("li")[0].style.display=
"block"})}});$("[data-trigger='[ct/switch]']",a).off("click");$("[data-trigger='[ct/switch]']",a).on("click",function(){$(".paginationTabSelected",this.parentElement).removeClass("paginationTabSelected");var a=this.getAttribute("data");$(this).addClass("paginationTabSelected");history.replaceState({location:window._.location,scope:window._.scope},null,"#"+a);window.lazy(this.parentElement.getAttribute("data-target"),"")});$("[data-trigger='[ct/toggle]']",a).off("change");$("[data-trigger='[ct/toggle]']",
a).on("change",function(){var a;for(a=this.parentElement;"tr"!==a.nodeName.toLowerCase();)a=a.parentElement;var b=-1;window.batch.forEach(function(c){if(c.getAttribute("data-id")===a.getAttribute("data-id"))return b=window.batch.indexOf(c)});-1!==b&&window.batch.splice(b,1);if(this.checked)return window.batch.push(a)});$("[data-trigger='[table/choice]']",a).off("click");$("[data-trigger='[table/choice]']",a).on("click",function(){var a=$(this).parent(".modalSelect");var b=this.getAttribute("data-mode");
switch($("select",a)[0].value){case "delete":return window.api.remove(b,window.batch,!0)}});$("[data-trigger='[modal/action]']",a).off("click");$("[data-trigger='[modal/action]']",a).on("click",function(){var a=$(this).parent(".modal");var b=this.getAttribute("data-mode");switch(this.getAttribute("data-action")){case "delete":return window.api.remove(b,a[0],!1)}});$("[data-trigger='[modal/form]']",a).off("submit");$("[data-trigger='[modal/form]']",a).on("submit",function(a){a.preventDefault();a=this.getAttribute("data-mode");
switch(this.getAttribute("data-action")){case "create":return window.api.create(a,this,!1);case "edit":return window.api.edit(a,this,0!==window.batch.length)}});$("[data-trigger='[grid/delete]']",a).off("click");$("[data-trigger='[grid/delete]']",a).on("click",function(){var a=$(this).parent(".serverGridItem");var b=this.getAttribute("data-mode");return window.api.remove(b,a[0],!1)});$('[data-trigger="[clip/copy]"]',a).off("click");$('[data-trigger="[clip/copy]"]',a).on("click",function(){return window.style.copy(this.getAttribute("data-clipboard-text"))});
$('[data-trigger="[input/duration]"]',a).off("keypress");$('[data-trigger="[input/duration]"]',a).on("keypress",function(a){a.preventDefault();var c=this.selectionStart;if(/[PTYDHMS0-9]/.test(a.key.toUpperCase()||1!==a.key.length)){var b=a.target.value;b=b.substr(0,c)+a.key+b.substr(c);b=b.toUpperCase();"P"!==b[0]&&(b="P"+b,c+=1);a.target.value=b;this.setSelectionRange(c+1,c+1);try{return $(this).removeClass("invalid"),new Duration(b)}catch(m){return $(this).addClass("invalid")}}});$('[data-trigger="[input/range]"]',
a).off("keypress");$('[data-trigger="[input/range]"]',a).on("keypress",function(a){a.preventDefault();var b=this.selectionStart;var c=this.getAttribute("data-min");var d=this.getAttribute("data-max");if(/[0-9]/.test(a.key.toUpperCase()||1!==a.key.length)){var e=a.target.value;e=e.substr(0,b)+a.key+e.substr(b);e=parseInt(e);e>parseInt(d)&&(e=d);e<parseInt(c)&&(e=c);a.target.value=e;return this.setSelectionRange(b+1,b+1)}});$('[data-trigger="[select/multiple/double]"]',a).on("click",function(){var a=
$(this.getAttribute("data-source"));var b=$(this.getAttribute("data-target"));return Array.from(a[0].selectedOptions).forEach(function(a){return b[0].insertBefore(a,b[0].firstChild)})})};window._={init:b,menu:function(){$(".paginationTabs").forEach(function(a){var b;var d=a.children;var c=[];var f=0;for(b=d.length;f<b;f++)a=d[f],window.location.hash&&window.location.hash.substring(1)===a.getAttribute("data")?c.push($(a).addClass("paginationTabSelected")):c.push(void 0);return c})}};window.batch=[]}).call(this);
