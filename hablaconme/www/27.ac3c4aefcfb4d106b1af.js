(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{QdjV:function(t,n,e){"use strict";e.d(n,"a",(function(){return p}));var o=e("mrSG"),r=e("cUzu"),i=e("AytR"),a=e("qTy+"),s=e("TYT/"),c=e("j+Tt"),l=e("sPEm"),p=function(){function t(t,n,e,o,r,a){this.http=t,this.sesion=n,this.storage=e,this.loadingController=o,this.alertController=r,this.toastController=a,this.archivoAPIUrls="assets/data/api.json",this.apiUrl=i.a,this.token="",console.log("Dentro del servicio API: "+this.apiUrl),this.getIndex()}return t.prototype.getIndex=function(){var t=this;return new Promise((function(n){t.http.get(t.apiUrl+"/").subscribe((function(t){n(t),console.log(t)}),(function(t){console.log(t)}))}))},t.prototype.obtenerURLAPI=function(t){return this.apiUrl+"/"+t},t.prototype.consultaGET=function(t){var n=this.obtenerToken();return this.http.get(this.obtenerURLAPI(t),{headers:n}).toPromise()},t.prototype.consultaPOST=function(t,n){var e=this.obtenerToken();return this.http.post(this.obtenerURLAPI(t),n,{headers:e}).toPromise()},t.prototype.consultaPOSTsinToken=function(t,n){return this.http.post(this.obtenerURLAPI(t),n).toPromise()},t.prototype.consultaPOSTImagen=function(t,n){var e=this.obtenerToken(),o=new FormData;return o.append("imagen",n,n.name),this.http.post(this.obtenerURLAPI(t),o,{headers:e}).toPromise()},t.prototype.consultaPUT=function(t,n){var e=this.obtenerToken();return this.http.put(this.obtenerURLAPI(t),n,{headers:e}).toPromise()},t.prototype.consultaDELETE=function(t){var n=this.obtenerToken();return this.http.delete(this.obtenerURLAPI(t),{headers:n}).toPromise()},t.prototype.obtenerToken=function(){return new r.c({Authorization:this.sesion.obtenerToken()})},t.prototype.mostrarCargando=function(){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(t){switch(t.label){case 0:return[4,this.loadingController.create({duration:5e3,spinner:"crescent",translucent:!0,cssClass:"custom-class custom-loading"})];case 1:return[4,t.sent().present()];case 2:return[2,t.sent()]}}))}))},t.prototype.quitarCargando=function(){var t=this;setTimeout((function(){t.loadingController.dismiss()}),500)},t.prototype.presentAlert=function(t){return Object(o.b)(this,void 0,void 0,(function(){var n;return Object(o.e)(this,(function(e){switch(e.label){case 0:return[4,this.alertController.create({cssClass:"alert",message:t})];case 1:return[4,(n=e.sent()).present()];case 2:return e.sent(),setTimeout((function(){n.dismiss()}),3e3),[2]}}))}))},t.prototype.presentAlertError=function(t){return Object(o.b)(this,void 0,void 0,(function(){var n;return Object(o.e)(this,(function(e){switch(e.label){case 0:return[4,this.alertController.create({cssClass:"alert_pago_error",message:t})];case 1:return[4,(n=e.sent()).present()];case 2:return e.sent(),setTimeout((function(){n.dismiss()}),3e3),[2]}}))}))},t.prototype.presentarToast=function(t,n,e){return void 0===n&&(n="secondary"),void 0===e&&(e=2e3),Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(o){switch(o.label){case 0:return[4,this.toastController.create({message:t,duration:e,color:n,buttons:[{text:"X",role:"cancel",handler:function(){console.log("Cancel clicked")}}]})];case 1:return o.sent().present(),[2]}}))}))},t.miUtil=void 0,t.\u0275fac=function(n){return new(n||t)(s.Tb(r.a),s.Tb(a.a),s.Tb(c.b),s.Tb(l.M),s.Tb(l.a),s.Tb(l.U))},t.\u0275prov=s.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},fc4K:function(t,n,e){"use strict";e.r(n),e.d(n,"Tab10PageModule",(function(){return g}));var o=e("sPEm"),r=e("DUip"),i=e("Valr"),a=e("QJY3"),s=e("QdjV"),c=e("AytR"),l=e("TYT/"),p=e("o8Qb");function u(t,n){1&t&&l.Lb(0,"ion-progress-bar",6)}function h(t,n){if(1&t&&(l.Pb(0,"ion-list"),l.Pb(1,"ion-item",8),l.Pb(2,"ion-avatar"),l.Lb(3,"img",9),l.Ob(),l.Pb(4,"ion-label"),l.Pb(5,"h2"),l.rc(6),l.Ob(),l.Ob(),l.Pb(7,"p"),l.rc(8),l.Ob(),l.Ob(),l.Ob()),2&t){var e=n.$implicit,o=l.Zb(2);l.Ab(3),l.hc("src","",o.enlaceApi,"",e.avatar,"",l.nc),l.Ab(3),l.sc(e.nombre),l.Ab(2),l.sc(e.fecha_caducidad)}}function b(t,n){if(1&t&&(l.Nb(0),l.Lb(1,"img",7),l.qc(2,h,9,4,"ion-list",5),l.Mb()),2&t){var e=n.$implicit;l.Ab(1),l.gc("src","./assets/imgs/plan",e.value.nombre,".svg",l.nc),l.Ab(1),l.ec("ngForOf",e.value.usuarios)}}function d(t,n){if(1&t&&(l.Pb(0,"ion-list"),l.Pb(1,"ion-item",10),l.Pb(2,"ion-label"),l.Pb(3,"p"),l.rc(4),l.Ob(),l.Ob(),l.Ob(),l.Ob()),2&t){var e=n.$implicit;l.Ab(4),l.sc(e.nombre)}}var f=function(){function t(t,n){this.menu=t,this.util=n,this.plan="3d",this.reserva_videollamada=!0,this.tiempo_espera_videollamada=!0,this.barra_cargando=!1,this.enlaceApi=c.a,this.listadoPlanesArray=[],this.plan="1d",this.reserva_videollamada=!1,this.tiempo_espera_videollamada=!0,this.util.mostrarCargando(),this.listarUsuarios()}return t.prototype.ionViewWillEnter=function(){},t.prototype.abreMenu=function(){this.menu.open("end")},t.prototype.listarUsuarios=function(){var t=this;this.util.consultaGET("usuarios/plan").then((function(n){t.listadoPlanesArray=[],t.listadoPlanes=n,t.listadoUsuariosSinPlan=t.listadoPlanes.usuarios_sin_plan,t.listadoPlanes=t.listadoPlanes.planes_contratados;for(var e=0,o=t.transformKey(t.listadoPlanes);e<o.length;e++)t.listadoPlanesArray.push(o[e]);t.util.quitarCargando(),t.barra_cargando=!1}))},t.prototype.transformKey=function(t){var n=[];for(var e in t)n.push({key:e,value:t[e]});return n},t.prototype.doRefresh=function(t){var n=this;this.barra_cargando=!0,setTimeout((function(){n.listarUsuarios(),t.target.complete()}),1e3)},t.\u0275fac=function(n){return new(n||t)(l.Kb(o.N),l.Kb(s.a))},t.\u0275cmp=l.Eb({type:t,selectors:[["app-tab10"]],decls:15,vars:9,consts:[["src","./assets/imgs/cara_header.svg",1,"logo_header"],[1,"texto_header"],["color","tertiary","type","indeterminate",4,"ngIf"],["slot","fixed",3,"ionRefresh"],["refreshingSpinner","null"],[4,"ngFor","ngForOf"],["color","tertiary","type","indeterminate"],[1,"logo_plan",3,"src"],[1,"lista_metas"],[3,"src"],[1,"listado_simple"]],template:function(t,n){1&t&&(l.Pb(0,"ion-header"),l.Pb(1,"ion-toolbar"),l.Lb(2,"img",0),l.Pb(3,"h4",1),l.rc(4),l.ac(5,"translate"),l.Ob(),l.Ob(),l.qc(6,u,1,0,"ion-progress-bar",2),l.Ob(),l.Pb(7,"ion-content"),l.Pb(8,"ion-refresher",3),l.Xb("ionRefresh",(function(t){return n.doRefresh(t)})),l.Lb(9,"ion-refresher-content",4),l.Ob(),l.qc(10,b,3,2,"ng-container",5),l.Pb(11,"h3"),l.rc(12),l.ac(13,"translate"),l.Ob(),l.qc(14,d,5,1,"ion-list",5),l.Ob()),2&t&&(l.Ab(4),l.sc(l.bc(5,5,"admin_tab5_cadena4")),l.Ab(2),l.ec("ngIf",1==n.barra_cargando),l.Ab(4),l.ec("ngForOf",n.listadoPlanesArray),l.Ab(2),l.sc(l.bc(13,7,"admin_tab5_cadena2")),l.Ab(2),l.ec("ngForOf",n.listadoUsuariosSinPlan))},directives:[o.n,o.J,i.i,o.i,o.w,o.x,i.h,o.u,o.s,o.q,o.d,o.r],pipes:[p.c],styles:["form[_ngcontent-%COMP%]{vertical-align:middle;text-align:center;margin-top:25px;margin-bottom:60px;padding-right:15px;padding-left:15px}ion-toolbar[_ngcontent-%COMP%]{height:40px}ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{position:absolute;top:-1px;right:0;--box-shadow:none!important;--background:#fff;color:#212322}.logo_header[_ngcontent-%COMP%]{width:18px;top:9px;left:10px}.logo_header[_ngcontent-%COMP%], .texto_header[_ngcontent-%COMP%]{position:absolute;margin-bottom:5px}.texto_header[_ngcontent-%COMP%]{top:10px;left:40px;margin-top:0;font-size:16px}.boton_pie_rosa[_ngcontent-%COMP%]{text-transform:none;font-family:HKGrotesk!important;font-weight:700;font-size:20px;height:60px;width:100%;margin-left:0;margin-bottom:0;--border-style:none;--color:#4a5e6e;position:absolute;bottom:0}.contenedor_boton_flotante[_ngcontent-%COMP%]{margin-top:-10px}ion-label[_ngcontent-%COMP%]{margin-left:15px;padding-top:1px}.telefono[_ngcontent-%COMP%], ion-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px}ion-item[_ngcontent-%COMP%]{--border-width:0px!important;--highlight-color-focused:none!important;--inner-border-width:0px!important;--full-highlight-height:none;--padding-start:15px;--padding-end:15px}.metas_activas[_ngcontent-%COMP%]{margin-top:-25px}ion-avatar[_ngcontent-%COMP%]{width:25px;height:25px}.logo_plan[_ngcontent-%COMP%]{margin-top:20px}.logo_plan[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{margin-left:15px}.fechas[_ngcontent-%COMP%]{margin-right:15px}.listado_simple[_ngcontent-%COMP%]{height:30px}.listado_simple[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0}"]}),t}(),g=function(){function t(){}return t.\u0275mod=l.Ib({type:t}),t.\u0275inj=l.Hb({factory:function(n){return new(n||t)},imports:[[o.K,i.b,a.d,r.j.forChild([{path:"",component:f}]),p.b.forChild()]]}),t}()},"qTy+":function(t,n,e){"use strict";e.d(n,"a",(function(){return a}));var o=e("mrSG"),r=e("TYT/"),i=e("j+Tt"),a=function(){function t(t){this.storage=t,this.miSesion=void 0}return t.prototype.obtenerToken=function(){return this.token},t.prototype.guardarToken=function(t){this.token=t},t.prototype.obtenerRol=function(){return this.rol},t.prototype.guardarRol=function(t){this.rol=t},t.prototype.crearSesion=function(){var t=this;this.storage.get("usuario_token").then((function(n){t.token=n}))},t.prototype.login=function(t){this.datosUsuario=t},t.prototype.getUsuario=function(){return this.datosUsuario},t.prototype.getPlan=function(t){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(t){switch(t.label){case 0:return[4,this.storage.get("plan").then((function(t){}))];case 1:return t.sent(),[2]}}))}))},t.\u0275fac=function(n){return new(n||t)(r.Tb(i.b))},t.\u0275prov=r.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);