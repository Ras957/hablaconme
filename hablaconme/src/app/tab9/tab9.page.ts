import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UtilService } from '../servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-tab9',
  templateUrl: 'tab9.page.html',
  styleUrls: ['tab9.page.scss']
})
export class Tab9Page {
  public plan="3d";
  public reserva_videollamada= true;
  public tiempo_espera_videollamada= true;
  barra_cargando = false;

  respuesta;
  listadoPagosProgramados = [];
  listadoPagosNoProgramados = [];
  listadoPagosPasados = [];
  server_URL = SERVER_URL;

  constructor(private menu: MenuController,
    public util: UtilService){
    this.plan= '1d';
    this.reserva_videollamada= false;
    this.tiempo_espera_videollamada= true;

    this.util.mostrarCargando();
    this.listarPagos();
  }

  ionViewWillEnter(){
    //this.listarPagos();
 }

  abreMenu(){
    this.menu.open('end');
  }

  listarPagos(){
    this.listadoPagosProgramados = [];
    this.listadoPagosNoProgramados = [];
    this.listadoPagosPasados = [];
    this.util.consultaGET("planescontratados")    
    .then( (data) =>{
      this.respuesta = data;
     
      this.listadoPagosProgramados = this.respuesta.pagos_programados;
      
      this.listadoPagosNoProgramados = this.respuesta.pagos_no_programados;
  
      this.listadoPagosPasados = this.respuesta.pagos_pasados;

      this.util.quitarCargando();
      this.barra_cargando= false;

    });
  }

  doRefresh(event){
    this.barra_cargando= true;
    setTimeout(() => {
      this.listarPagos(); 
      event.target.complete(); 
    }, 1000);
  }

}
