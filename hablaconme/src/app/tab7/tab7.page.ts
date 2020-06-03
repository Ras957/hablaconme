import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { UtilService } from '../servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';
import * as moment from 'moment';
import { MensajeAdminPage } from '../modals/mensaje-admin/mensaje-admin.page';

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss']
})
export class Tab7Page {
  public plan="3d";
  public reserva_videollamada= true;
  public tiempo_espera_videollamada= true;
  barra_cargando = false;
  listadoChats;
  server_URL = SERVER_URL;

  constructor(private menu: MenuController,
    private util: UtilService,
    private modalController: ModalController){
    this.util.mostrarCargando();
    this.listarChats();

  }

  

  abreMenu(){
    this.menu.open('end');
  }

  listarChats(){
    this.util.consultaGET("chats")    
    .then( (data) =>{
      this.listadoChats = data;
      this.listadoChats = this.listadoChats.chats;  

      this.listadoChats.forEach((chat, index) => {
        console.log("Fecha:::::");
        console.log(this.listadoChats[index].fecha_modificacion);
        this.listadoChats[index].fecha_modificacion = this.formatearFecha(this.listadoChats[index].fecha_modificacion);
      });
      this.util.quitarCargando();
      this.barra_cargando=false;
    });
  }

  doRefresh(event){
    this.barra_cargando= true;
    setTimeout(() => {
      this.listarChats(); //CAMBIAR POR METODO ACTUALIZAR LISTADO
      event.target.complete();
    }, 1000);
  }

  formatearFecha(fecha_entera){
    moment.locale('es')
    let fecha_actual= moment(moment().format());
    let fecha_anterior=  moment.unix(fecha_entera);
    if (fecha_actual.diff(fecha_anterior, 'day') > 1){
      return fecha_anterior.format("DD/MM/YYYY HH:mm");
    }else{
      return fecha_anterior.fromNow();
    }
  }

async presentModalMensaje(item){
  const modal = await this.modalController.create({
    component: MensajeAdminPage,
    componentProps: {item : item}
  });
  modal.onDidDismiss()
  .then((data) => {
    this.barra_cargando= true;
    this.listarChats(); 
    });
  return await modal.present();
}

async presentModalSeleccionarUsuario(){
  const modal = await this.modalController.create({
    component: MensajeAdminPage,
    componentProps: {}
  });
  modal.onDidDismiss()
  .then((data) => {
    //this.presentModalMensaje(data);    
    this.barra_cargando= true;
    this.listarChats(); 
    
    });
  return await modal.present();
}


  
}
