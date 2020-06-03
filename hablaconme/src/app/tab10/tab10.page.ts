import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UtilService } from '../servicios/util.service';
import { SERVER_URL } from '../../environments/environment';

@Component({
  selector: 'app-tab10',
  templateUrl: 'tab10.page.html',
  styleUrls: ['tab10.page.scss']
})
export class Tab10Page {
  public plan = "3d";
  public reserva_videollamada = true;
  public tiempo_espera_videollamada = true;
  barra_cargando = false;

  enlaceApi = SERVER_URL;


  listadoPlanes;
  listadoUsuariosSinPlan;
  listadoPlanesArray = [];


  constructor(private menu: MenuController,
    private util: UtilService) {
    this.plan = '1d';
    this.reserva_videollamada = false;
    this.tiempo_espera_videollamada = true;
    this.util.mostrarCargando();
    this.listarUsuarios();

  }

  ionViewWillEnter() {
    //this.listarUsuarios();
  }

  abreMenu() {
    this.menu.open('end');
  }

  listarUsuarios() {
    this.util.consultaGET("usuarios/plan")
      .then((data) => {
        this.listadoPlanesArray = [];
        this.listadoPlanes = data;

       
         this.listadoUsuariosSinPlan = this.listadoPlanes.usuarios_sin_plan;   
         this.listadoPlanes = this.listadoPlanes.planes_contratados;
    

        let lista = this.transformKey(this.listadoPlanes);
        //let lista = Object.keys(this.listadoPlanes);


          for (let planes of lista) {
            this.listadoPlanesArray.push(planes);
          }
        



        this.util.quitarCargando();
        this.barra_cargando = false;

      });
  }


  transformKey(value): any {
    let keys = [];
    for (let key in value) {
      keys.push({ key: key, value: value[key] });
    }
    return keys;
  }

  doRefresh(event) {
    this.barra_cargando = true;
    setTimeout(() => {
      this.listarUsuarios();
      event.target.complete();
    }, 1000);
  }

}
