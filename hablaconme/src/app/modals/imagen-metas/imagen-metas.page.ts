import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { UtilService } from 'src/app/servicios/util.service';
import { WebView } from '@ionic-native/ionic-webview/ngx';

import { File } from '@ionic-native/file/ngx';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-imagen-metas',
  templateUrl: './imagen-metas.page.html',
  styleUrls: ['./imagen-metas.page.scss'],
})
export class ImagenMetasPage implements OnInit {

  listadoAvatares= [];
  respuesta;
  server_URL = SERVER_URL;
  imagen_escogida;


  constructor(private modalController: ModalController,
    private imagePicker: ImagePicker,
    public util: UtilService,
    private webview: WebView,
    private file: File) {

  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.recuperarListado();
  }

  dismiss() {
    this.modalController.dismiss(this.imagen_escogida);
  }

  pulsarAvatar(item,evento){
    if(item == "./assets/imgs/elige_foto.svg"){
      console.log("SUBIR SUBIR SUBIR");
      this.seleccionarImagen(evento);
    }
    else if(item=="./assets/imgs/avatar_salir.svg"){
      console.log("SALIR SALIR SALIR");
      this.dismiss();
    }else{
      console.log("Seleccinar imagen");
    }
  }

  seleccionarImagen(evt) {
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      this.subirImagen(file);
    }
  }

  subirImagen(imagen){
    var json={imagen: imagen};
    console.log(json);
    this.util.consultaPOSTImagen("imagenesmetas", imagen)    
    .then( (data) =>{
      console.log("Respuesta API subir imagen: ");
      console.log(data);
      this.recuperarListado();
    });
  }

  recuperarListado(){
    this.listadoAvatares = [];
    this.listadoAvatares.push("./assets/imgs/elige_foto.svg");
    this.util.consultaGET("imagenesmetas")    
    .then( (data) =>{
      this.respuesta = data;
      this.respuesta = this.respuesta.imagenes_metas;
      this.respuesta.forEach(img=>{
        var imagen_meta = {url: this.server_URL + img.url, id: img.id}
        this.listadoAvatares.push(imagen_meta);
      });
      var salir = {url:"./assets/imgs/avatar_salir.svg" };
      this.listadoAvatares.push(salir);  
    });
  }

  imagenEscogida(item){
    console.log("IMAGEN ESCOGIDA: ");
    console.log(item);
    this.imagen_escogida = item;
    this.dismiss();
  }



  
}
