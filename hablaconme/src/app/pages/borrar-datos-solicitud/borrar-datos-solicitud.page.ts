import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BorrarDatosConfirmacionPage } from 'src/app/modals/borrar-datos-confirmacion/borrar-datos-confirmacion.page';

@Component({
  selector: 'app-borrar-datos-solicitud',
  templateUrl: './borrar-datos-solicitud.page.html',
  styleUrls: ['./borrar-datos-solicitud.page.scss'],
})
export class BorrarDatosSolicitudPage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModalBorraDatos(){
    const modal = await this.modalController.create({
      component: BorrarDatosConfirmacionPage,
      componentProps: {}
    });
    return await modal.present();
  }
}
