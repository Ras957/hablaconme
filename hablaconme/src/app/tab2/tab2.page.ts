import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { UtilService } from '../servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';
import * as moment from 'moment';
import { SesionService } from '../servicios/sesion.service';
import { MensajeAdminPage } from '../modals/mensaje-admin/mensaje-admin.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public plan;
  public reserva_videollamada= true;
  public tiempo_espera_videollamada= true;
  barra_cargando = false;
  listadoChats;
  server_URL = SERVER_URL;
  
  constructor(private menu: MenuController,
    private util: UtilService,
    private sesion: SesionService,
    private modalController: ModalController){
    this.comprobarPlan;
    this.reserva_videollamada= false;
    this.tiempo_espera_videollamada= true;
    this.util.mostrarCargando();
    this.listarChats();
  }

  comprobarPlan(){
    this.sesion.getPlan(this.plan);
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

}
