import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-borrar-datos-confirmacion',
  templateUrl: './borrar-datos-confirmacion.page.html',
  styleUrls: ['./borrar-datos-confirmacion.page.scss'],
})
export class BorrarDatosConfirmacionPage implements OnInit {

  constructor(private modalcontroller: ModalController) { }

  ngOnInit() {
  }
  dismiss(){
    this.modalcontroller.dismiss();
  }
}
