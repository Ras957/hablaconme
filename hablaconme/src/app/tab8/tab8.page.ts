import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AyadirEditarMetasPage } from '../modals/ayadir-editar-metas/ayadir-editar-metas.page';
import { MetasPage } from '../modals/metas/metas.page';
import { UtilService } from '../servicios/util.service';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from 'src/environments/environment';


@Component({
  selector: 'app-tab8',
  templateUrl: 'tab8.page.html',
  styleUrls: ['tab8.page.scss']
})
export class Tab8Page {

  public plan="3d";
  public reserva_videollamada= true;
  public tiempo_espera_videollamada= true;
  listadoMetasActivas;
  listadoMetasFinalizadas;
  listadoMetasFinalizadasArray= [];
  admin = false;
  server_URL = SERVER_URL;
  barra_cargando = false;

  constructor(private menu: MenuController, 
    private modalController: ModalController,
    private util: UtilService,
    private storage: Storage){
      
    this.util.mostrarCargando();
    this.listarMetas();

  }
  ionViewWillEnter(){
    //this.listarMetas();

    this.storage.get('rol').then((val) => {
      if(val != 1){
        this.admin = false;
      }else{
        this.admin= true;
      }
    }); 
 }

  abreMenu(){
    this.menu.open('end');
  }


  listarMetas(){
    this.listadoMetasFinalizadasArray= [];
    this.util.consultaGET("metas")    
    .then( (data) =>{
      this.listadoMetasActivas = data;
      this.listadoMetasFinalizadas = this.listadoMetasActivas.metas_finalizadas;
      this.listadoMetasActivas = this.listadoMetasActivas.metas_activas;  

      let lista = this.transformKey(this.listadoMetasFinalizadas);

      for(let metas of lista){
        this.listadoMetasFinalizadasArray.push(metas);
      }
      this.util.quitarCargando();
      this.barra_cargando= false;

    });
  }

  transformKey(value) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }

  async presentModalAyadirEditarMeta(){
    const modal = await this.modalController.create({
      component: AyadirEditarMetasPage,
      componentProps: {}
    });
    modal.onDidDismiss()
    .then(() => { 
      //  Recargando la página
      this.barra_cargando= true;
      setTimeout(() => {
        this.listarMetas(); 
      }, 1000);
      
    });
    return await modal.present();
  }

  async presentModalMeta(meta){
    const modal = await this.modalController.create({
      component: MetasPage,
      componentProps: {meta: meta, admin: this.admin}
    });
    modal.onDidDismiss()
    .then(() => { 
      //  Recargando la página
      this.barra_cargando= true;
      setTimeout(() => {
        this.listarMetas(); 
      }, 1000);
    });
    return await modal.present();
  }

  doRefresh(event){
    this.barra_cargando= true;
    setTimeout(() => {
      this.listarMetas(); 
      event.target.complete(); 
    }, 1000);
  }
 
}
