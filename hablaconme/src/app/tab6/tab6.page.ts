import { Component } from '@angular/core';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { LlamadaPage } from '../modals/llamada/llamada.page';
import { UtilService } from '../servicios/util.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as moment from 'moment';
import { EntrarVideollamadaPage } from '../pages/entrar-videollamada/entrar-videollamada.page';
import { SERVER_URL } from 'src/environments/environment';


@Component({
  selector: 'app-tab6',
  templateUrl: 'tab6.page.html',
  styleUrls: ['tab6.page.scss']
})
export class Tab6Page {
  
  server_URL = SERVER_URL;
  listadoSesiones;
  listadoSesionesHoy;
  barra_cargando = false;
  constructor(private menu: MenuController, 
    private modalController: ModalController,
    private util: UtilService,
    private statusBar: StatusBar,
    public loadingController: LoadingController){
      this.util.mostrarCargando();
      this.listarSesiones();
  }

  ionViewWillEnter(){
    this.barra_cargando = true;
    this.listarSesiones();
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByName("white");
  }

  abreMenu(){
    this.menu.open('end');
  }

  async presentModalLlamada(){
    const modal = await this.modalController.create({
      component: LlamadaPage,
      componentProps: {}
    });
    return await modal.present();
  }

  
  async presentModalVideollamada(videollamada){
    const modal = await this.modalController.create({
      component: EntrarVideollamadaPage,
      componentProps: {videollamada : videollamada}
    });
    return await modal.present();
  }


  listarSesiones(){
    this.util.consultaGET("sesiones")    
    .then( (data) =>{
      console.log("LISTADO DE SESIONESSSSSSSSSSS");
      console.log(data);
      this.listadoSesiones = data;

      this.listadoSesionesHoy = this.listadoSesiones.sesiones_hoy;
      this.listadoSesiones = this.listadoSesiones.sesiones; 

      this.listadoSesionesHoy.forEach(sesion => {
        sesion.fecha = this.fechaFormato(sesion.fecha);
        sesion.imagen_usuario = this.server_URL + sesion.imagen_usuario;
        console.log("Imagen: "+ sesion.imagen_usuario);
      });
      this.listadoSesiones.forEach(sesion => {
        sesion.fecha = this.fechaFormato(sesion.fecha);
        sesion.imagen_usuario = this.server_URL + sesion.imagen_usuario;
        console.log("Imagen: "+ sesion.imagen_usuario);
      });
      this.util.quitarCargando();
      this.barra_cargando=false;
    });
  }


  eliminarSesion(sesion){
    this.util.mostrarCargando();

    this.util.consultaDELETE("sesiones/"+ sesion.id)    
      .then(data =>{
        let respuesta = data;
        this.listarSesiones();
      });
       
  }

  fechaFormato(fecha){
    moment.locale('es');
    return moment(fecha).format("dddd DD[/]MM [|] HH:mm");
  
  }

  doRefresh(event){
    this.barra_cargando= true;
    setTimeout(() => {
      this.listarSesiones(); 
      event.target.complete(); 
    }, 1000);
  }
 
}
