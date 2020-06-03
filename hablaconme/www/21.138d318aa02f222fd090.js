(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{QdjV:function(t,e,n){"use strict";n.d(e,"a",(function(){return p}));var o=n("mrSG"),r=n("cUzu"),s=n("AytR"),i=n("qTy+"),a=n("TYT/"),c=n("j+Tt"),u=n("sPEm"),p=function(){function t(t,e,n,o,r,i){this.http=t,this.sesion=e,this.storage=n,this.loadingController=o,this.alertController=r,this.toastController=i,this.archivoAPIUrls="assets/data/api.json",this.apiUrl=s.a,this.token="",console.log("Dentro del servicio API: "+this.apiUrl),this.getIndex()}return t.prototype.getIndex=function(){var t=this;return new Promise((function(e){t.http.get(t.apiUrl+"/").subscribe((function(t){e(t),console.log(t)}),(function(t){console.log(t)}))}))},t.prototype.obtenerURLAPI=function(t){return this.apiUrl+"/"+t},t.prototype.consultaGET=function(t){var e=this.obtenerToken();return this.http.get(this.obtenerURLAPI(t),{headers:e}).toPromise()},t.prototype.consultaPOST=function(t,e){var n=this.obtenerToken();return this.http.post(this.obtenerURLAPI(t),e,{headers:n}).toPromise()},t.prototype.consultaPOSTsinToken=function(t,e){return this.http.post(this.obtenerURLAPI(t),e).toPromise()},t.prototype.consultaPOSTImagen=function(t,e){var n=this.obtenerToken(),o=new FormData;return o.append("imagen",e,e.name),this.http.post(this.obtenerURLAPI(t),o,{headers:n}).toPromise()},t.prototype.consultaPUT=function(t,e){var n=this.obtenerToken();return this.http.put(this.obtenerURLAPI(t),e,{headers:n}).toPromise()},t.prototype.consultaDELETE=function(t){var e=this.obtenerToken();return this.http.delete(this.obtenerURLAPI(t),{headers:e}).toPromise()},t.prototype.obtenerToken=function(){return new r.c({Authorization:this.sesion.obtenerToken()})},t.prototype.mostrarCargando=function(){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(t){switch(t.label){case 0:return[4,this.loadingController.create({duration:5e3,spinner:"crescent",translucent:!0,cssClass:"custom-class custom-loading"})];case 1:return[4,t.sent().present()];case 2:return[2,t.sent()]}}))}))},t.prototype.quitarCargando=function(){var t=this;setTimeout((function(){t.loadingController.dismiss()}),500)},t.prototype.presentAlert=function(t){return Object(o.b)(this,void 0,void 0,(function(){var e;return Object(o.e)(this,(function(n){switch(n.label){case 0:return[4,this.alertController.create({cssClass:"alert",message:t})];case 1:return[4,(e=n.sent()).present()];case 2:return n.sent(),setTimeout((function(){e.dismiss()}),3e3),[2]}}))}))},t.prototype.presentAlertError=function(t){return Object(o.b)(this,void 0,void 0,(function(){var e;return Object(o.e)(this,(function(n){switch(n.label){case 0:return[4,this.alertController.create({cssClass:"alert_pago_error",message:t})];case 1:return[4,(e=n.sent()).present()];case 2:return n.sent(),setTimeout((function(){e.dismiss()}),3e3),[2]}}))}))},t.prototype.presentarToast=function(t,e,n){return void 0===e&&(e="secondary"),void 0===n&&(n=2e3),Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(o){switch(o.label){case 0:return[4,this.toastController.create({message:t,duration:n,color:e,buttons:[{text:"X",role:"cancel",handler:function(){console.log("Cancel clicked")}}]})];case 1:return o.sent().present(),[2]}}))}))},t.miUtil=void 0,t.\u0275fac=function(e){return new(e||t)(a.Tb(r.a),a.Tb(i.a),a.Tb(c.b),a.Tb(u.M),a.Tb(u.a),a.Tb(u.U))},t.\u0275prov=a.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},ZRIR:function(t,e,n){"use strict";n.r(e),n.d(e,"PagoPageModule",(function(){return p}));var o=n("Valr"),r=n("QJY3"),s=n("DUip"),i=n("sPEm"),a=n("6eKo"),c=n("TYT/"),u=[{path:"",component:a.a}],p=function(){function t(){}return t.\u0275mod=c.Ib({type:t}),t.\u0275inj=c.Hb({factory:function(e){return new(e||t)},imports:[[o.b,r.d,r.k,i.K,s.j.forChild(u)]]}),t}()},"qTy+":function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));var o=n("mrSG"),r=n("TYT/"),s=n("j+Tt"),i=function(){function t(t){this.storage=t,this.miSesion=void 0}return t.prototype.obtenerToken=function(){return this.token},t.prototype.guardarToken=function(t){this.token=t},t.prototype.obtenerRol=function(){return this.rol},t.prototype.guardarRol=function(t){this.rol=t},t.prototype.crearSesion=function(){var t=this;this.storage.get("usuario_token").then((function(e){t.token=e}))},t.prototype.login=function(t){this.datosUsuario=t},t.prototype.getUsuario=function(){return this.datosUsuario},t.prototype.getPlan=function(t){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(t){switch(t.label){case 0:return[4,this.storage.get("plan").then((function(t){}))];case 1:return t.sent(),[2]}}))}))},t.\u0275fac=function(e){return new(e||t)(r.Tb(s.b))},t.\u0275prov=r.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);