(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{DM5x:function(t,e,n){"use strict";n.d(e,"a",(function(){return h}));var o=n("tAfe"),i=n("QdjV"),r=n("eHpL"),a=n("FAH8"),s=n("AytR"),c=n("TYT/"),l=n("sPEm"),u=n("QJY3"),p=n("Valr");function d(t,e){if(1&t){var n=c.Qb();c.Nb(0),c.Pb(1,"img",6),c.Xb("click",(function(){return c.mc(n),c.lc(3).click()})),c.Ob(),c.Pb(2,"input",7,8),c.Xb("change",(function(t){c.mc(n);var e=c.Zb().$implicit;return c.Zb().pulsarAvatar(e,t)})),c.Ob(),c.Mb()}if(2&t){var o=c.Zb().$implicit;c.Ab(1),c.fc("src",o,c.nc)}}function b(t,e){if(1&t){var n=c.Qb();c.Nb(0),c.Pb(1,"img",6),c.Xb("click",(function(){c.mc(n);var t=c.Zb().$implicit;return c.Zb().imagenEscogida(t)})),c.Ob(),c.Mb()}if(2&t){var o=c.Zb().$implicit;c.Ab(1),c.fc("src",o.url,c.nc)}}function g(t,e){if(1&t&&(c.Pb(0,"ion-col",4),c.qc(1,d,4,1,"ng-container",5),c.qc(2,b,2,1,"ng-container",5),c.Ob()),2&t){var n=e.index;c.Ab(1),c.ec("ngIf",0==n),c.Ab(1),c.ec("ngIf",0!=n)}}var h=function(){function t(t,e,n,o,i){this.modalController=t,this.imagePicker=e,this.util=n,this.webview=o,this.file=i,this.listadoAvatares=[],this.server_URL=s.a}return t.prototype.ngOnInit=function(){},t.prototype.ionViewWillEnter=function(){this.recuperarListado()},t.prototype.dismiss=function(){this.modalController.dismiss(this.imagen_escogida)},t.prototype.pulsarAvatar=function(t,e){"./assets/imgs/elige_foto.svg"==t?(console.log("SUBIR SUBIR SUBIR"),this.seleccionarImagen(e)):"./assets/imgs/avatar_salir.svg"==t?(console.log("SALIR SALIR SALIR"),this.dismiss()):console.log("Seleccinar imagen")},t.prototype.seleccionarImagen=function(t){var e=t.target.files,n=e[0];e&&n&&this.subirImagen(n)},t.prototype.subirImagen=function(t){var e=this;console.log({imagen:t}),this.util.consultaPOSTImagen("imagenesmetas",t).then((function(t){console.log("Respuesta API subir imagen: "),console.log(t),e.recuperarListado()}))},t.prototype.recuperarListado=function(){var t=this;this.listadoAvatares=[],this.listadoAvatares.push("./assets/imgs/elige_foto.svg"),this.util.consultaGET("imagenesmetas").then((function(e){t.respuesta=e,t.respuesta=t.respuesta.imagenes_metas,t.respuesta.forEach((function(e){t.listadoAvatares.push({url:t.server_URL+e.url,id:e.id})})),t.listadoAvatares.push({url:"./assets/imgs/avatar_salir.svg"})}))},t.prototype.imagenEscogida=function(t){console.log("IMAGEN ESCOGIDA: "),console.log(t),this.imagen_escogida=t,this.dismiss()},t.\u0275fac=function(e){return new(e||t)(c.Kb(l.O),c.Kb(o.a),c.Kb(i.a),c.Kb(r.a),c.Kb(a.a))},t.\u0275cmp=c.Eb({type:t,selectors:[["app-imagen-metas"]],decls:10,vars:1,consts:[[1,"atras",3,"click"],["src","./assets/imgs/Izquierda2.svg",1,"logo_header"],[1,"texto_header"],["size","4",4,"ngFor","ngForOf"],["size","4"],[4,"ngIf"],[3,"src","click"],["type","file",2,"display","none",3,"change"],["fileInput",""]],template:function(t,e){1&t&&(c.Pb(0,"ion-header"),c.Pb(1,"ion-toolbar"),c.Pb(2,"div",0),c.Xb("click",(function(){return e.dismiss()})),c.Ob(),c.Lb(3,"img",1),c.Pb(4,"h4",2),c.rc(5,"Elige el icono de la nueva meta"),c.Ob(),c.Ob(),c.Ob(),c.Pb(6,"ion-content"),c.Pb(7,"form"),c.Pb(8,"ion-grid"),c.qc(9,g,3,2,"ion-col",3),c.Ob(),c.Ob(),c.Ob()),2&t&&(c.Ab(9),c.ec("ngForOf",e.listadoAvatares))},directives:[l.n,l.J,l.i,u.m,u.i,u.j,l.m,p.h,l.h,p.i],styles:["ion-toolbar[_ngcontent-%COMP%]{height:40px}.atras[_ngcontent-%COMP%]{width:40px;height:40px;top:0}.atras[_ngcontent-%COMP%], .logo_header[_ngcontent-%COMP%]{position:absolute;margin-bottom:5px}.logo_header[_ngcontent-%COMP%]{width:10px;top:9px;left:10px}.texto_header[_ngcontent-%COMP%]{position:absolute;top:10px;left:40px;margin-top:0;margin-bottom:5px;font-size:16px}form[_ngcontent-%COMP%]{vertical-align:middle;text-align:left;margin-top:25px;padding-right:15px;padding-left:15px}ion-grid[_ngcontent-%COMP%]{text-align:center}ion-col[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:10px;width:70px;border-radius:100%}"]}),t}()},IFN2:function(t,e,n){"use strict";n.d(e,"a",(function(){return d}));var o=n("mrSG"),i=n("DM5x"),r=n("QdjV"),a=n("QJY3"),s=n("TYT/"),c=n("sPEm"),l=n("Valr"),u=n("o8Qb");function p(t,e){if(1&t&&(s.Nb(0),s.Pb(1,"ion-select-option",13),s.rc(2),s.Ob(),s.Mb()),2&t){var n=e.$implicit;s.Ab(1),s.fc("value",n.id),s.Ab(1),s.tc(" ",n.nombre," ")}}var d=function(){function t(t,e,n,o){this.modalController=t,this.util=e,this.formBuilder=n,this.toastController=o,this.imagen_seleccionada={url:"./assets/imgs/no-avatar.svg",id:""},this.meta_form=this.formBuilder.group({titulo:["",a.l.required],descripcion:["",a.l.required]})}return t.prototype.ngOnInit=function(){console.log(this.imagen_seleccionada)},t.prototype.ionViewWillEnter=function(){this.listarUsuarios()},t.prototype.dismiss=function(){this.modalController.dismiss()},t.prototype.listarUsuarios=function(){var t=this;this.util.consultaGET("usuarios").then((function(e){t.listadoUsuarios=e,t.listadoUsuarios=t.listadoUsuarios.usuarios}))},t.prototype.getUsuario=function(t){this.usuario=t.detail.value,console.log("Usuario ID: "+this.usuario)},t.prototype.presentModalImagenMeta=function(){return Object(o.b)(this,void 0,void 0,(function(){var t,e=this;return Object(o.e)(this,(function(n){switch(n.label){case 0:return[4,this.modalController.create({component:i.a,componentProps:{}})];case 1:return(t=n.sent()).onDidDismiss().then((function(t){e.imagen_seleccionada=t.data,console.log("DATOS RECUPERADOS: "),console.log(e.imagen_seleccionada)})),[4,t.present()];case 2:return[2,n.sent()]}}))}))},t.prototype.guardarMeta=function(){var t=this,e=this.meta_form.get("titulo").value,n=this.meta_form.get("descripcion").value;null!=this.usuario&&""!=this.imagen_seleccionada.id?this.util.consultaPOST("meta",{titulo:e,descripcion:n,usuario:this.usuario,imagen:this.imagen_seleccionada.id}).then((function(e){t.dismiss()})):this.presentarToast("Revisa los datos introducidos, parece que falta algo")},t.prototype.presentarToast=function(t){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(e){switch(e.label){case 0:return[4,this.toastController.create({message:t,duration:2e3})];case 1:return e.sent().present(),[2]}}))}))},t.\u0275fac=function(e){return new(e||t)(s.Kb(c.O),s.Kb(r.a),s.Kb(a.a),s.Kb(c.U))},t.\u0275cmp=s.Eb({type:t,selectors:[["app-ayadir-editar-metas"]],decls:35,vars:28,consts:[[1,"atras",3,"click"],["src","./assets/imgs/Izquierda2.svg",1,"logo_header"],[1,"texto_header"],[1,"selecciona_persona"],[1,"persona",3,"src","click"],[3,"formGroup"],["position","stacked"],["interface","action-sheet","cancelText","Cancelar",3,"ionChange"],["selected","selected","value",""],[4,"ngFor","ngForOf"],["name","titulo","formControlName","titulo",3,"placeholder"],["name","descripcion","formControlName","descripcion",3,"placeholder"],["expand","full","shape","round","size","large",1,"boton",3,"disabled","click"],[3,"value"]],template:function(t,e){1&t&&(s.Pb(0,"ion-header"),s.Pb(1,"ion-toolbar"),s.Pb(2,"div",0),s.Xb("click",(function(){return e.dismiss()})),s.Ob(),s.Lb(3,"img",1),s.Pb(4,"h4",2),s.rc(5),s.ac(6,"translate"),s.Ob(),s.Ob(),s.Ob(),s.Pb(7,"ion-content"),s.Pb(8,"div",3),s.Pb(9,"img",4),s.Xb("click",(function(){return e.presentModalImagenMeta()})),s.Ob(),s.Ob(),s.Pb(10,"form",5),s.Pb(11,"ion-item"),s.Pb(12,"ion-label",6),s.rc(13),s.ac(14,"translate"),s.Ob(),s.Pb(15,"ion-select",7),s.Xb("ionChange",(function(t){return e.getUsuario(t)})),s.Pb(16,"ion-select-option",8),s.rc(17),s.ac(18,"translate"),s.Ob(),s.qc(19,p,3,2,"ng-container",9),s.Ob(),s.Ob(),s.Pb(20,"ion-item"),s.Pb(21,"ion-label",6),s.rc(22),s.ac(23,"translate"),s.Ob(),s.Lb(24,"ion-input",10),s.ac(25,"translate"),s.Ob(),s.Pb(26,"ion-item"),s.Pb(27,"ion-label",6),s.rc(28),s.ac(29,"translate"),s.Ob(),s.Lb(30,"ion-textarea",11),s.ac(31,"translate"),s.Ob(),s.Pb(32,"ion-button",12),s.Xb("click",(function(){return e.guardarMeta()})),s.rc(33),s.ac(34,"translate"),s.Ob(),s.Ob(),s.Ob()),2&t&&(s.Ab(5),s.sc(s.bc(6,12,"ayadir_editar_metas_cadena1")),s.Ab(4),s.fc("src",e.imagen_seleccionada.url,s.nc),s.Ab(1),s.ec("formGroup",e.meta_form),s.Ab(3),s.sc(s.bc(14,14,"ayadir_editar_metas_cadena2")),s.Ab(4),s.sc(s.bc(18,16,"ayadir_editar_metas_cadena3")),s.Ab(2),s.ec("ngForOf",e.listadoUsuarios),s.Ab(3),s.sc(s.bc(23,18,"ayadir_editar_metas_cadena4")),s.Ab(2),s.fc("placeholder",s.bc(25,20,"ayadir_editar_metas_cadena5")),s.Ab(4),s.sc(s.bc(29,22,"ayadir_editar_metas_cadena6")),s.Ab(2),s.fc("placeholder",s.bc(31,24,"ayadir_editar_metas_cadena7")),s.Ab(2),s.ec("disabled",!e.meta_form.valid),s.Ab(1),s.sc(s.bc(34,26,"ayadir_editar_metas_cadena8")))},directives:[c.n,c.J,c.i,a.m,a.i,a.c,c.q,c.r,c.A,c.S,c.B,l.h,c.p,c.T,a.h,a.b,c.H,c.e],pipes:[u.c],styles:["ion-toolbar[_ngcontent-%COMP%]{height:40px}.atras[_ngcontent-%COMP%]{width:40px;height:40px;top:0}.atras[_ngcontent-%COMP%], .logo_header[_ngcontent-%COMP%]{position:absolute;margin-bottom:5px}.logo_header[_ngcontent-%COMP%]{width:10px;top:9px;left:10px}.texto_header[_ngcontent-%COMP%]{position:absolute;top:10px;left:40px;margin-top:0;margin-bottom:5px;font-size:16px}form[_ngcontent-%COMP%]{vertical-align:middle;text-align:center;margin-top:25px;margin-bottom:60px;padding-right:15px;padding-left:15px}form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]{--border-width:0px!important;--highlight-color-focused:none!important;--inner-border-width:0px!important;--full-highlight-height:none}form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-bottom:10px;font-family:HKGrotesk}form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]{border:1px solid #f2f0e8;--padding-start:10px;--color:#212322;font-family:HKGrotesk}form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]{--padding-top:12px;height:43px}form[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-textarea[_ngcontent-%COMP%]{border:1px solid #f2f0e8;--padding-start:10px;--color:#212322;font-family:HKGrotesk;height:100px}.selecciona_persona[_ngcontent-%COMP%]{width:100%;text-align:center;margin-top:25px}.persona[_ngcontent-%COMP%]{width:46%;display:inline-table;margin-left:2%;margin-right:2%;margin-bottom:10px;border-radius:100%}.boton[_ngcontent-%COMP%]{margin:5% 0;text-transform:none;--background:#d9017a!important;color:#fff;--ion-color-contrast:none!important;font-family:HKGrotesk!important;font-weight:700}"]}),t}()},QdjV:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var o=n("mrSG"),i=n("cUzu"),r=n("AytR"),a=n("qTy+"),s=n("TYT/"),c=n("j+Tt"),l=n("sPEm"),u=function(){function t(t,e,n,o,i,a){this.http=t,this.sesion=e,this.storage=n,this.loadingController=o,this.alertController=i,this.toastController=a,this.archivoAPIUrls="assets/data/api.json",this.apiUrl=r.a,this.token="",console.log("Dentro del servicio API: "+this.apiUrl),this.getIndex()}return t.prototype.getIndex=function(){var t=this;return new Promise((function(e){t.http.get(t.apiUrl+"/").subscribe((function(t){e(t),console.log(t)}),(function(t){console.log(t)}))}))},t.prototype.obtenerURLAPI=function(t){return this.apiUrl+"/"+t},t.prototype.consultaGET=function(t){var e=this.obtenerToken();return this.http.get(this.obtenerURLAPI(t),{headers:e}).toPromise()},t.prototype.consultaPOST=function(t,e){var n=this.obtenerToken();return this.http.post(this.obtenerURLAPI(t),e,{headers:n}).toPromise()},t.prototype.consultaPOSTsinToken=function(t,e){return this.http.post(this.obtenerURLAPI(t),e).toPromise()},t.prototype.consultaPOSTImagen=function(t,e){var n=this.obtenerToken(),o=new FormData;return o.append("imagen",e,e.name),this.http.post(this.obtenerURLAPI(t),o,{headers:n}).toPromise()},t.prototype.consultaPUT=function(t,e){var n=this.obtenerToken();return this.http.put(this.obtenerURLAPI(t),e,{headers:n}).toPromise()},t.prototype.consultaDELETE=function(t){var e=this.obtenerToken();return this.http.delete(this.obtenerURLAPI(t),{headers:e}).toPromise()},t.prototype.obtenerToken=function(){return new i.c({Authorization:this.sesion.obtenerToken()})},t.prototype.mostrarCargando=function(){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(t){switch(t.label){case 0:return[4,this.loadingController.create({duration:5e3,spinner:"crescent",translucent:!0,cssClass:"custom-class custom-loading"})];case 1:return[4,t.sent().present()];case 2:return[2,t.sent()]}}))}))},t.prototype.quitarCargando=function(){var t=this;setTimeout((function(){t.loadingController.dismiss()}),500)},t.prototype.presentAlert=function(t){return Object(o.b)(this,void 0,void 0,(function(){var e;return Object(o.e)(this,(function(n){switch(n.label){case 0:return[4,this.alertController.create({cssClass:"alert",message:t})];case 1:return[4,(e=n.sent()).present()];case 2:return n.sent(),setTimeout((function(){e.dismiss()}),3e3),[2]}}))}))},t.prototype.presentAlertError=function(t){return Object(o.b)(this,void 0,void 0,(function(){var e;return Object(o.e)(this,(function(n){switch(n.label){case 0:return[4,this.alertController.create({cssClass:"alert_pago_error",message:t})];case 1:return[4,(e=n.sent()).present()];case 2:return n.sent(),setTimeout((function(){e.dismiss()}),3e3),[2]}}))}))},t.prototype.presentarToast=function(t,e,n){return void 0===e&&(e="secondary"),void 0===n&&(n=2e3),Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(o){switch(o.label){case 0:return[4,this.toastController.create({message:t,duration:n,color:e,buttons:[{text:"X",role:"cancel",handler:function(){console.log("Cancel clicked")}}]})];case 1:return o.sent().present(),[2]}}))}))},t.miUtil=void 0,t.\u0275fac=function(e){return new(e||t)(s.Tb(i.a),s.Tb(a.a),s.Tb(c.b),s.Tb(l.M),s.Tb(l.a),s.Tb(l.U))},t.\u0275prov=s.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},"qTy+":function(t,e,n){"use strict";n.d(e,"a",(function(){return a}));var o=n("mrSG"),i=n("TYT/"),r=n("j+Tt"),a=function(){function t(t){this.storage=t,this.miSesion=void 0}return t.prototype.obtenerToken=function(){return this.token},t.prototype.guardarToken=function(t){this.token=t},t.prototype.obtenerRol=function(){return this.rol},t.prototype.guardarRol=function(t){this.rol=t},t.prototype.crearSesion=function(){var t=this;this.storage.get("usuario_token").then((function(e){t.token=e}))},t.prototype.login=function(t){this.datosUsuario=t},t.prototype.getUsuario=function(){return this.datosUsuario},t.prototype.getPlan=function(t){return Object(o.b)(this,void 0,void 0,(function(){return Object(o.e)(this,(function(t){switch(t.label){case 0:return[4,this.storage.get("plan").then((function(t){}))];case 1:return t.sent(),[2]}}))}))},t.\u0275fac=function(e){return new(e||t)(i.Tb(r.b))},t.\u0275prov=i.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);