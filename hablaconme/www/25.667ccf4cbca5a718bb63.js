(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{QdjV:function(t,o,n){"use strict";n.d(o,"a",(function(){return u}));var e=n("mrSG"),r=n("cUzu"),i=n("AytR"),s=n("qTy+"),a=n("TYT/"),c=n("j+Tt"),l=n("sPEm"),u=function(){function t(t,o,n,e,r,s){this.http=t,this.sesion=o,this.storage=n,this.loadingController=e,this.alertController=r,this.toastController=s,this.archivoAPIUrls="assets/data/api.json",this.apiUrl=i.a,this.token="",console.log("Dentro del servicio API: "+this.apiUrl),this.getIndex()}return t.prototype.getIndex=function(){var t=this;return new Promise((function(o){t.http.get(t.apiUrl+"/").subscribe((function(t){o(t),console.log(t)}),(function(t){console.log(t)}))}))},t.prototype.obtenerURLAPI=function(t){return this.apiUrl+"/"+t},t.prototype.consultaGET=function(t){var o=this.obtenerToken();return this.http.get(this.obtenerURLAPI(t),{headers:o}).toPromise()},t.prototype.consultaPOST=function(t,o){var n=this.obtenerToken();return this.http.post(this.obtenerURLAPI(t),o,{headers:n}).toPromise()},t.prototype.consultaPOSTsinToken=function(t,o){return this.http.post(this.obtenerURLAPI(t),o).toPromise()},t.prototype.consultaPOSTImagen=function(t,o){var n=this.obtenerToken(),e=new FormData;return e.append("imagen",o,o.name),this.http.post(this.obtenerURLAPI(t),e,{headers:n}).toPromise()},t.prototype.consultaPUT=function(t,o){var n=this.obtenerToken();return this.http.put(this.obtenerURLAPI(t),o,{headers:n}).toPromise()},t.prototype.consultaDELETE=function(t){var o=this.obtenerToken();return this.http.delete(this.obtenerURLAPI(t),{headers:o}).toPromise()},t.prototype.obtenerToken=function(){return new r.c({Authorization:this.sesion.obtenerToken()})},t.prototype.mostrarCargando=function(){return Object(e.b)(this,void 0,void 0,(function(){return Object(e.e)(this,(function(t){switch(t.label){case 0:return[4,this.loadingController.create({duration:5e3,spinner:"crescent",translucent:!0,cssClass:"custom-class custom-loading"})];case 1:return[4,t.sent().present()];case 2:return[2,t.sent()]}}))}))},t.prototype.quitarCargando=function(){var t=this;setTimeout((function(){t.loadingController.dismiss()}),500)},t.prototype.presentAlert=function(t){return Object(e.b)(this,void 0,void 0,(function(){var o;return Object(e.e)(this,(function(n){switch(n.label){case 0:return[4,this.alertController.create({cssClass:"alert",message:t})];case 1:return[4,(o=n.sent()).present()];case 2:return n.sent(),setTimeout((function(){o.dismiss()}),3e3),[2]}}))}))},t.prototype.presentAlertError=function(t){return Object(e.b)(this,void 0,void 0,(function(){var o;return Object(e.e)(this,(function(n){switch(n.label){case 0:return[4,this.alertController.create({cssClass:"alert_pago_error",message:t})];case 1:return[4,(o=n.sent()).present()];case 2:return n.sent(),setTimeout((function(){o.dismiss()}),3e3),[2]}}))}))},t.prototype.presentarToast=function(t,o,n){return void 0===o&&(o="secondary"),void 0===n&&(n=2e3),Object(e.b)(this,void 0,void 0,(function(){return Object(e.e)(this,(function(e){switch(e.label){case 0:return[4,this.toastController.create({message:t,duration:n,color:o,buttons:[{text:"X",role:"cancel",handler:function(){console.log("Cancel clicked")}}]})];case 1:return e.sent().present(),[2]}}))}))},t.miUtil=void 0,t.\u0275fac=function(o){return new(o||t)(a.Tb(r.a),a.Tb(s.a),a.Tb(c.b),a.Tb(l.M),a.Tb(l.a),a.Tb(l.U))},t.\u0275prov=a.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},b8Qw:function(t,o,n){"use strict";n.r(o),n.d(o,"SignInPageModule",(function(){return _}));var e=n("Valr"),r=n("QJY3"),i=n("DUip"),s=n("sPEm"),a=n("mrSG"),c=n("QdjV"),l=n("qTy+"),u=n("Wcq6"),p=n("up+p"),g=n("GGTb"),b=n("TYT/"),d=n("j+Tt"),h=n("sNDO"),f=n("o8Qb"),m=[{path:"",component:function(){function t(t,o,n,e,i,s,a,c,l,u,p){this.modalController=t,this.formBuilder=o,this.util=n,this.sesion=e,this.router=i,this.toastController=s,this.storage=a,this.afAuth=c,this.platform=l,this.google=u,this.fb=p,this.valor_toggle=!1,this.login_form=this.formBuilder.group({email:["",r.l.compose([r.l.required,r.l.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")])],password:["",r.l.required]})}return t.prototype.ngOnInit=function(){},t.prototype.login=function(){var t=this,o=this.login_form.get("email").value,n=this.login_form.get("password").value;this.sesion.login(o),this.util.consultaPOSTsinToken("login",{email:o,password:n}).then((function(o){console.log("Respuesta API: "),console.log(o),t.datos_login=o,t.datos_login.token&&(t.storage.set("usuario_token",t.datos_login.token),t.storage.set("usuario_primer_login","false"),t.sesion.guardarToken(t.datos_login.token),t.util.consultaGET("rol").then((function(o){t.rol=o,console.log("Respuesta: "+o),console.log("Rol es: "+t.rol.rol.id),t.storage.set("rol",t.rol.rol.id),1==t.rol.rol.id?(t.router.navigateByUrl("/tabs/tab6"),t.util.presentarToast("Inicio de sesi\xf3n correcto","secondary")):(t.router.navigateByUrl("/tabs/tab1"),t.util.presentarToast("Inicio de sesi\xf3n correcto","secondary"))})))})).catch((function(o){t.util.presentarToast("Los datos introducidos no son correctos, vuelva a intentarlo.","secondary")}))},t.prototype.loginGoogle=function(){this.platform.is("android")?this.loginGoogleAndroid():this.loginGoogleWeb()},t.prototype.loginGoogleWeb=function(){return Object(a.b)(this,void 0,void 0,(function(){var t,o=this;return Object(a.e)(this,(function(n){switch(n.label){case 0:return[4,this.afAuth.signInWithPopup(new u.auth.GoogleAuthProvider).then((function(n){n&&n.user.email&&(o.sesion.login(n.user.email),t={email:n.user.email,password:n.user.getIdToken()})}))];case 1:return n.sent(),this.util.consultaPOSTsinToken("login",t).then((function(t){console.log("Respuesta API: "),console.log(t),o.datos_login=t,o.datos_login.token&&(o.storage.set("usuario_token",o.datos_login.token),o.storage.set("usuario_primer_login","false"),o.sesion.guardarToken(o.datos_login.token),o.util.consultaGET("rol").then((function(t){o.rol=t,console.log("Respuesta: "+t),console.log("Rol es: "+o.rol.rol.id),o.storage.set("rol",o.rol.rol.id),1==o.rol.rol.id?(o.router.navigateByUrl("/tabs/tab6"),o.util.presentarToast("Inicio de sesi\xf3n correcto","secondary")):(o.router.navigateByUrl("/tabs/tab1"),o.util.presentarToast("Inicio de sesi\xf3n correcto","secondary"))})))})).catch((function(t){o.util.presentarToast("Los datos introducidos no son correctos, vuelva a intentarlo.","secondary")})),[2]}}))}))},t.prototype.loginGoogleAndroid=function(){return Object(a.b)(this,void 0,void 0,(function(){var t;return Object(a.e)(this,(function(o){switch(o.label){case 0:return[4,this.google.login({webClientId:"695142026098-nsdcng882ps03htvir61le6sldv26bu1.apps.googleusercontent.com",offline:!0})];case 1:return t=o.sent(),[4,this.afAuth.signInWithCredential(u.auth.GoogleAuthProvider.credential(t.idToken))];case 2:return o.sent(),[2]}}))}))},t.prototype.loginFacebook=function(){try{this.fb.login(["public_profile","user_friends","email"]).then((function(t){return console.log("Logged into Facebook!",t)})).catch((function(t){return console.log("Error logging into Facebook",t)})),this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART)}catch(t){console.log(t)}},t.\u0275fac=function(o){return new(o||t)(b.Kb(s.O),b.Kb(r.a),b.Kb(c.a),b.Kb(l.a),b.Kb(i.g),b.Kb(s.U),b.Kb(d.b),b.Kb(h.a),b.Kb(s.Q),b.Kb(p.a),b.Kb(g.a))},t.\u0275cmp=b.Eb({type:t,selectors:[["app-sign-in"]],decls:35,vars:32,consts:[[1,"background"],[3,"formGroup"],["color","light","expand","full","shape","round","size","large",1,"boton_social_google",3,"click"],["src","./assets/imgs/sociales/Google.svg",1,"logo"],["color","secondary","expand","full","shape","round","size","large",1,"boton_social_facebook",3,"click"],["src","./assets/imgs/sociales/Facebook.svg",1,"logo"],[1,"linea_texto"],["type","text","name","email","formControlName","email",1,"input_email",3,"placeholder"],["type","password","name","password","formControlName","password",1,"input_email",3,"placeholder"],["color","light","expand","full","shape","round","size","large",1,"boton",3,"disabled","click"],[1,"contenedor_bajo"],["button","","routerLink","/reestablecer-contraseya",1,"enlace_login"],["button","","routerLink","/sign-up",1,"enlace_login"]],template:function(t,o){1&t&&(b.Pb(0,"ion-content",0),b.Pb(1,"form",1),b.Pb(2,"h1"),b.rc(3),b.ac(4,"translate"),b.Ob(),b.Pb(5,"p"),b.rc(6),b.ac(7,"translate"),b.Ob(),b.Pb(8,"ion-button",2),b.Xb("click",(function(){return o.loginGoogle()})),b.Lb(9,"img",3),b.rc(10),b.ac(11,"translate"),b.Ob(),b.Pb(12,"ion-button",4),b.Xb("click",(function(){return o.loginFacebook()})),b.Lb(13,"img",5),b.rc(14),b.ac(15,"translate"),b.Ob(),b.Pb(16,"p",6),b.rc(17),b.ac(18,"translate"),b.Ob(),b.Pb(19,"ion-item"),b.Lb(20,"ion-input",7),b.ac(21,"translate"),b.Ob(),b.Pb(22,"ion-item"),b.Lb(23,"ion-input",8),b.ac(24,"translate"),b.Ob(),b.Pb(25,"ion-button",9),b.Xb("click",(function(){return o.login()})),b.rc(26),b.ac(27,"translate"),b.Ob(),b.Ob(),b.Pb(28,"div",10),b.Pb(29,"a",11),b.rc(30),b.ac(31,"translate"),b.Ob(),b.Pb(32,"a",12),b.rc(33),b.ac(34,"translate"),b.Ob(),b.Ob(),b.Ob()),2&t&&(b.Ab(1),b.ec("formGroup",o.login_form),b.Ab(2),b.sc(b.bc(4,12,"signin_cadena1")),b.Ab(3),b.sc(b.bc(7,14,"signin_cadena2")),b.Ab(4),b.tc(" ",b.bc(11,16,"signin_cadena3")," "),b.Ab(4),b.tc(" ",b.bc(15,18,"signin_cadena4")," "),b.Ab(3),b.sc(b.bc(18,20,"signin_cadena5")),b.Ab(3),b.fc("placeholder",b.bc(21,22,"signin_cadena6")),b.Ab(3),b.fc("placeholder",b.bc(24,24,"signin_cadena7")),b.Ab(2),b.ec("disabled",!o.login_form.valid),b.Ab(1),b.sc(b.bc(27,26,"signin_cadena8")),b.Ab(4),b.sc(b.bc(31,28,"signin_cadena9")),b.Ab(3),b.sc(b.bc(34,30,"signin_cadena10")))},directives:[s.i,r.m,r.i,r.c,s.e,s.q,s.p,s.T,r.h,r.b,i.i,s.R],pipes:[f.c],styles:["form[_ngcontent-%COMP%]{vertical-align:middle;text-align:center;color:#fff;margin-top:50px}ion-item[_ngcontent-%COMP%]{--border-width:0px!important;--highlight-color-focused:none!important;--inner-border-width:0px!important;--full-highlight-height:none}.boton[_ngcontent-%COMP%]{margin:0 5% 5%;text-transform:none;color:#d9017a!important;--ion-color-contrast:none!important;font-family:HKGrotesk!important;font-weight:700}.boton_social_google[_ngcontent-%COMP%]{color:#212322!important}.boton_social_facebook[_ngcontent-%COMP%], .boton_social_google[_ngcontent-%COMP%]{margin:5%;text-transform:none;--ion-color-contrast:none!important;font-size:16px;height:44px;justify-content:left}.boton_social_facebook[_ngcontent-%COMP%]{color:#fff!important;--ripple-color:#00f!important}.logo[_ngcontent-%COMP%]{margin-right:8px;width:23px}.input_email[_ngcontent-%COMP%]{border:1px solid #fff;border-radius:6px;height:50px;margin-bottom:15px;--color:#fff;--placeholder-color:#fff;--placeholder-opacity:1;--padding-start:15px!important;--padding-end:15px!important}.politicas[_ngcontent-%COMP%]{color:#fff;text-align:left;margin-left:20px;width:70%;overflow:visible}.politicas[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:12px;margin-bottom:0}.politicas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:12px;margin-top:5px}ion-toggle[_ngcontent-%COMP%]{bottom:55px;right:-100%;--handle-background:#fff!important}.linea_texto[_ngcontent-%COMP%]{overflow:hidden;margin-top:0}.contenedor_bajo[_ngcontent-%COMP%]{vertical-align:middle;text-align:center}.contenedor_bajo[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{display:block;margin-bottom:5px}.enlace_login[_ngcontent-%COMP%]{color:#fff}"]}),t}()}],_=function(){function t(){}return t.\u0275mod=b.Ib({type:t}),t.\u0275inj=b.Hb({factory:function(o){return new(o||t)},imports:[[e.b,r.d,r.k,s.K,i.j.forChild(m),f.b.forChild()]]}),t}()},"qTy+":function(t,o,n){"use strict";n.d(o,"a",(function(){return s}));var e=n("mrSG"),r=n("TYT/"),i=n("j+Tt"),s=function(){function t(t){this.storage=t,this.miSesion=void 0}return t.prototype.obtenerToken=function(){return this.token},t.prototype.guardarToken=function(t){this.token=t},t.prototype.obtenerRol=function(){return this.rol},t.prototype.guardarRol=function(t){this.rol=t},t.prototype.crearSesion=function(){var t=this;this.storage.get("usuario_token").then((function(o){t.token=o}))},t.prototype.login=function(t){this.datosUsuario=t},t.prototype.getUsuario=function(){return this.datosUsuario},t.prototype.getPlan=function(t){return Object(e.b)(this,void 0,void 0,(function(){return Object(e.e)(this,(function(t){switch(t.label){case 0:return[4,this.storage.get("plan").then((function(t){}))];case 1:return t.sent(),[2]}}))}))},t.\u0275fac=function(o){return new(o||t)(r.Tb(i.b))},t.\u0275prov=r.Gb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()}}]);