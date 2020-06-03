import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
})
export class AvatarPage implements OnInit {

  listadoAvatares= [];
  respuesta;
  server_URL = SERVER_URL;
  imagen_escogida;


  constructor(private modalController: ModalController,
    public util: UtilService) {

  }

  ngOnInit() {
  }
  ionViewWillEnter(){
    this.util.mostrarCargando();
    this.recuperarListado();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  pulsarAvatar(item,evento){
    console.log("PULSADO");
    console.log(item);
    if(item == "./assets/imgs/elige_foto.svg"){
      console.log("SUBIR SUBIR SUBIR");
      this.seleccionarImagen(evento);
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
    this.util.mostrarCargando();
    var json={imagen: imagen};
    console.log(json);
    this.util.consultaPOSTImagen("avatares", imagen)    
    .then( (data) =>{
      console.log("Respuesta API subir imagen: ");
      console.log(data);
      this.recuperarListado();
    });
  }

  recuperarListado(){
    this.listadoAvatares = [];
    this.listadoAvatares.push("./assets/imgs/elige_foto.svg");
    this.util.consultaGET("avatares")    
    .then( (data) =>{
      this.respuesta = data;
      this.respuesta = this.respuesta.avatar;
      this.respuesta.forEach(img=>{
        var imagen_meta = {url: this.server_URL + img.url, id: img.id}
        this.listadoAvatares.push(imagen_meta);
      });
      this.util.quitarCargando();
    });
  }

  imagenEscogida(item){
    console.log("IMAGEN ESCOGIDA: ");
    console.log(item);
    this.imagen_escogida = item;
    var json = { campo: "avatar_id", valor: item.id };
    this.util.consultaPUT("usuarios", json)
      .then(data => {
        this.dismiss();
      });

  }





  
}
