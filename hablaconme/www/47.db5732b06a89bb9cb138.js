(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{vK2R:function(t,n,e){"use strict";e.r(n),e.d(n,"Tab8PageModule",(function(){return P}));var i=e("sPEm"),o=e("DUip"),a=e("Valr"),r=e("QJY3"),s=e("mrSG"),c=e("IFN2"),b=e("m/oV"),l=e("QdjV"),p=e("AytR"),d=e("TYT/"),m=e("j+Tt"),g=e("o8Qb");function h(t,n){1&t&&d.Lb(0,"ion-progress-bar",10)}function f(t,n){if(1&t){var e=d.Qb();d.Pb(0,"ion-list"),d.Pb(1,"ion-item",11),d.Xb("click",(function(){d.mc(e);var t=n.$implicit;return d.Zb().presentModalMeta(t)})),d.Pb(2,"ion-avatar",12),d.Lb(3,"img",13),d.Lb(4,"img",14),d.Ob(),d.Pb(5,"ion-label"),d.Pb(6,"h3"),d.rc(7),d.Ob(),d.Pb(8,"p",15),d.rc(9),d.Ob(),d.Ob(),d.Ob(),d.Ob()}if(2&t){var i=n.$implicit,o=d.Zb();d.Ab(3),d.hc("src","",o.server_URL,"",i.imagen_cliente,"",d.nc),d.Ab(1),d.hc("src","",o.server_URL,"",i.imagen,"",d.nc),d.Ab(3),d.sc(i.nombre_cliente),d.Ab(2),d.sc(i.titulo)}}function u(t,n){if(1&t&&(d.Nb(0),d.Pb(1,"ion-item",18),d.Pb(2,"ion-avatar"),d.Lb(3,"img",13),d.Ob(),d.Pb(4,"ion-label"),d.Pb(5,"p"),d.rc(6),d.Ob(),d.Ob(),d.Ob(),d.Mb()),2&t){var e=d.Zb().$implicit,i=d.Zb(2);d.Ab(3),d.hc("src","",i.server_URL,"",e.imagen,"",d.nc),d.Ab(3),d.sc(e.titulo)}}function _(t,n){if(1&t&&(d.Pb(0,"ion-list"),d.qc(1,u,7,3,"ng-container",17),d.Ob()),2&t){var e=n.$implicit,i=d.Zb().$implicit;d.Ab(1),d.ec("ngIf",e.nombre_cliente==i.nombre_cliente)}}function O(t,n){if(1&t&&(d.Pb(0,"ion-list"),d.Pb(1,"ion-item",16),d.Pb(2,"ion-avatar"),d.Lb(3,"img",13),d.Ob(),d.Pb(4,"ion-label"),d.Pb(5,"h2"),d.rc(6),d.Ob(),d.Ob(),d.Ob(),d.qc(7,_,2,1,"ion-list",6),d.Ob()),2&t){var e=n.$implicit,i=d.Zb();d.Ab(3),d.hc("src","",i.server_URL,"",e.value.imagen_cliente,"",d.nc),d.Ab(3),d.sc(e.key),d.Ab(1),d.ec("ngForOf",e.value.metas)}}var M=function(){function t(t,n,e,i){this.menu=t,this.modalController=n,this.util=e,this.storage=i,this.plan="3d",this.reserva_videollamada=!0,this.tiempo_espera_videollamada=!0,this.listadoMetasFinalizadasArray=[],this.admin=!1,this.server_URL=p.a,this.barra_cargando=!1,this.util.mostrarCargando(),this.listarMetas()}return t.prototype.ionViewWillEnter=function(){var t=this;this.storage.get("rol").then((function(n){t.admin=1==n}))},t.prototype.abreMenu=function(){this.menu.open("end")},t.prototype.listarMetas=function(){var t=this;this.listadoMetasFinalizadasArray=[],this.util.consultaGET("metas").then((function(n){t.listadoMetasActivas=n,t.listadoMetasFinalizadas=t.listadoMetasActivas.metas_finalizadas,t.listadoMetasActivas=t.listadoMetasActivas.metas_activas;for(var e=0,i=t.transformKey(t.listadoMetasFinalizadas);e<i.length;e++)t.listadoMetasFinalizadasArray.push(i[e]);t.util.quitarCargando(),t.barra_cargando=!1}))},t.prototype.transformKey=function(t){var n=[];for(var e in t)n.push({key:e,value:t[e]});return n},t.prototype.presentModalAyadirEditarMeta=function(){return Object(s.b)(this,void 0,void 0,(function(){var t,n=this;return Object(s.e)(this,(function(e){switch(e.label){case 0:return[4,this.modalController.create({component:c.a,componentProps:{}})];case 1:return(t=e.sent()).onDidDismiss().then((function(){n.barra_cargando=!0,setTimeout((function(){n.listarMetas()}),1e3)})),[4,t.present()];case 2:return[2,e.sent()]}}))}))},t.prototype.presentModalMeta=function(t){return Object(s.b)(this,void 0,void 0,(function(){var n,e=this;return Object(s.e)(this,(function(i){switch(i.label){case 0:return[4,this.modalController.create({component:b.a,componentProps:{meta:t,admin:this.admin}})];case 1:return(n=i.sent()).onDidDismiss().then((function(){e.barra_cargando=!0,setTimeout((function(){e.listarMetas()}),1e3)})),[4,n.present()];case 2:return[2,i.sent()]}}))}))},t.prototype.doRefresh=function(t){var n=this;this.barra_cargando=!0,setTimeout((function(){n.listarMetas(),t.target.complete()}),1e3)},t.\u0275fac=function(n){return new(n||t)(d.Kb(i.N),d.Kb(i.O),d.Kb(l.a),d.Kb(m.b))},t.\u0275cmp=d.Eb({type:t,selectors:[["app-tab8"]],decls:19,vars:6,consts:[["src","./assets/imgs/cara_header.svg",1,"logo_header"],[1,"texto_header"],["color","tertiary","type","indeterminate",4,"ngIf"],["slot","fixed",3,"ionRefresh"],["refreshingSpinner","null"],["id","titulo"],[4,"ngFor","ngForOf"],["vertical","bottom","horizontal","end","slot","fixed",3,"click"],["size","small","color","tertiary"],["name","add",1,"icono_boton"],["color","tertiary","type","indeterminate"],[3,"click"],[1,"metas_activas"],[3,"src"],[1,"margin30",3,"src"],[1,"margin30"],[1,"lista_metas"],[4,"ngIf"],[1,"lista_metas_item"]],template:function(t,n){1&t&&(d.Pb(0,"ion-header"),d.Pb(1,"ion-toolbar"),d.Lb(2,"img",0),d.Pb(3,"h4",1),d.rc(4),d.ac(5,"translate"),d.Ob(),d.Ob(),d.qc(6,h,1,0,"ion-progress-bar",2),d.Ob(),d.Pb(7,"ion-content"),d.Pb(8,"ion-refresher",3),d.Xb("ionRefresh",(function(t){return n.doRefresh(t)})),d.Lb(9,"ion-refresher-content",4),d.Ob(),d.Pb(10,"h3",5),d.rc(11,"Metas activas"),d.Ob(),d.qc(12,f,10,6,"ion-list",6),d.Pb(13,"h3",5),d.rc(14,"Metas anteriores"),d.Ob(),d.qc(15,O,8,4,"ion-list",6),d.Ob(),d.Pb(16,"ion-fab",7),d.Xb("click",(function(){return n.presentModalAyadirEditarMeta()})),d.Pb(17,"ion-fab-button",8),d.Lb(18,"ion-icon",9),d.Ob(),d.Ob()),2&t&&(d.Ab(4),d.sc(d.bc(5,4,"admin_tab3_cadena1")),d.Ab(2),d.ec("ngIf",1==n.barra_cargando),d.Ab(6),d.ec("ngForOf",n.listadoMetasActivas),d.Ab(3),d.ec("ngForOf",n.listadoMetasFinalizadasArray))},directives:[i.n,i.J,a.i,i.i,i.w,i.x,a.h,i.k,i.l,i.o,i.u,i.s,i.q,i.d,i.r],pipes:[g.c],styles:["ion-toolbar[_ngcontent-%COMP%]{height:40px}ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{position:absolute;top:-1px;right:0;--box-shadow:none!important;--background:#fff;color:#212322}.logo_header[_ngcontent-%COMP%]{width:18px;top:9px;left:10px}.logo_header[_ngcontent-%COMP%], .texto_header[_ngcontent-%COMP%]{position:absolute;margin-bottom:5px}.texto_header[_ngcontent-%COMP%]{top:10px;left:40px;margin-top:0;font-size:16px}.boton_pie_rosa[_ngcontent-%COMP%]{text-transform:none;font-family:HKGrotesk!important;font-weight:700;font-size:20px;height:60px;width:100%;margin-left:0;margin-bottom:0;--border-style:none;--color:#4a5e6e;position:absolute;bottom:0}.contenedor_boton_flotante[_ngcontent-%COMP%]{margin-top:-10px}ion-label[_ngcontent-%COMP%]{margin-left:15px;padding-top:1px}ion-label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{display:-webkit-inline-box;margin-top:12px}.telefono[_ngcontent-%COMP%]{font-size:12px}ion-item[_ngcontent-%COMP%]{--border-width:0px!important;--highlight-color-focused:none!important;--inner-border-width:0px!important;--full-highlight-height:none;--padding-start:15px;--padding-end:15px}.metas_activas[_ngcontent-%COMP%]{margin-top:-25px}ion-avatar[_ngcontent-%COMP%]{width:25px;height:25px}#titulo[_ngcontent-%COMP%]{padding-right:15px;padding-left:15px}.lista_metas[_ngcontent-%COMP%]{height:45px}.lista_metas_item[_ngcontent-%COMP%]{margin-left:20px;height:45px}.margin30[_ngcontent-%COMP%]{margin-left:20px}.lista_metas[_ngcontent-%COMP%]   ion-avatar[_ngcontent-%COMP%], .lista_metas[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{margin-top:0;margin-bottom:0}"]}),t}(),P=function(){function t(){}return t.\u0275mod=d.Ib({type:t}),t.\u0275inj=d.Hb({factory:function(n){return new(n||t)},imports:[[i.K,a.b,r.d,o.j.forChild([{path:"",component:M}]),g.b.forChild()]]}),t}()}}]);