import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ImagenMetasPage } from '../imagen-metas/imagen-metas.page';
import { UtilService } from 'src/app/servicios/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ayadir-editar-metas',
  templateUrl: './ayadir-editar-metas.page.html',
  styleUrls: ['./ayadir-editar-metas.page.scss'],
})
export class AyadirEditarMetasPage implements OnInit {
  public meta_form: FormGroup;
  listadoUsuarios;
  usuario;
  imagen_seleccionada = {url: "./assets/imgs/no-avatar.svg", id:""};
  constructor(private modalController: ModalController,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private toastController: ToastController) { 

      this.meta_form = this.formBuilder.group({
        titulo: ['',Validators.required],
        descripcion:['', Validators.required]
      });
    }

  ngOnInit() {
      console.log(this.imagen_seleccionada)
  }
  ionViewWillEnter() {
    this.listarUsuarios();
  }
  dismiss() {
    this.modalController.dismiss();
  }

  listarUsuarios() {
    this.util.consultaGET("usuarios")
      .then((data) => {
        this.listadoUsuarios = data;
        this.listadoUsuarios = this.listadoUsuarios.usuarios;
      });
  }

  getUsuario(usuario) {
    this.usuario = usuario.detail.value;
    console.log("Usuario ID: "+ this.usuario);
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

  guardarMeta(){
    var titu= this.meta_form.get("titulo").value;
    var descrip= this.meta_form.get("descripcion").value;
    if(this.usuario != undefined && this.imagen_seleccionada.id != ""){
      var json={titulo:titu, descripcion: descrip, usuario: this.usuario, imagen: this.imagen_seleccionada.id};
      this.util.consultaPOST("meta", json)    
      .then(data =>{
        let respuesta = data;
        this.dismiss();
      });
    }else{
      this.presentarToast("Revisa los datos introducidos, parece que falta algo");
    }
    
  }

  async presentarToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
