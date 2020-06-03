import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagenMetasPage } from '../imagen-metas/imagen-metas.page';
import { SERVER_URL } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/servicios/util.service';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.page.html',
  styleUrls: ['./metas.page.scss'],
})
export class MetasPage implements OnInit {
   // "value" passed in componentProps
   @Input() meta;
   @Input() admin;
   server_URL = SERVER_URL;
   imagen_seleccionada;
   rango_admin;
   public meta_form: FormGroup;
  constructor(private modalController: ModalController,
    private formBuilder: FormBuilder,
    private util: UtilService) { 
     
    }

  ngOnInit() { 
    
    this.imagen_seleccionada = {url: this.server_URL+ this.meta.imagen, id:""};
    this.meta_form = this.formBuilder.group({
      titulo: [this.meta.titulo,Validators.required],
      descripcion:[this.meta.descripcion, Validators.required],
      rango_admin:[this.meta.progreso_admin,Validators.required],
      rango_cliente:[this.meta.progreso_cliente,Validators.required]
    });
    
  }

  ionModalDidPresent(){
   console.log("EVENTO DE ENTRADA EN MODAL!!!");
 }
  dismiss() {
    this.modalController.dismiss();
  }
  

  async presentModalImagenMeta(){
    const modal = await this.modalController.create({
      component: ImagenMetasPage,
      componentProps: {}
    });
    modal.onDidDismiss()
    .then((data) => {
      //this.imagen_seleccionada = [];
      let imagen = data['data'];
      this.imagen_seleccionada = imagen; 
      console.log("DATOS RECUPERADOS: ");
      console.log(this.imagen_seleccionada);

      });
    return await modal.present();
  }

  actualizarMeta(){
    var titu= this.meta_form.get("titulo").value;
    var descrip= this.meta_form.get("descripcion").value;
    this.rango_admin= this.meta_form.get("rango_admin").value;

      var json={id: this.meta.id, titulo:titu, descripcion: descrip, imagen: this.imagen_seleccionada.id, progreso_admin: this.rango_admin};
      this.util.consultaPUT("meta", json)    
      .then(data =>{
        let respuesta = data;
        this.dismiss();
      });
  }

  eliminarMeta(){
    this.util.consultaDELETE("metas/"+ this.meta.id)    
      .then(data =>{
        let respuesta = data;
        console.log("Eliminado: ");
        console.log(respuesta);
        this.dismiss();
      });
  }
}
