import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, ToastController, Platform } from '@ionic/angular';
import { SERVER_URL } from 'src/environments/environment';
import { UtilService } from 'src/app/servicios/util.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


const ActionCable = require('actioncable');


@Component({
  selector: 'app-mensaje-admin',
  templateUrl: './mensaje-admin.page.html',
  styleUrls: ['./mensaje-admin.page.scss'],
})
export class MensajeAdminPage implements OnInit {
  @Input() item;
  @ViewChild('content', { static: true }) content: any;
  listadoMensajes;
  server_URL = SERVER_URL;
  pagina = 0;
  emisor;
  receptor;
  cable;
  mensaje;
  ChatChannel;
  enlinea;
  public mensaje_form: FormGroup;

  constructor(public modalController: ModalController,
    private util: UtilService,
    private storage: Storage,
    private toast: ToastController,
    private formBuilder: FormBuilder) { 
      this.util.mostrarCargando();
      this.mensaje_form = this.formBuilder.group({
        mensaje: ["",Validators.required]      
      });
      this.enlinea = false;
    }

    

  ngOnInit() {
    this.storage.get('rol').then((val) => {
      if(val != 1){
        this.emisor = this.item.cliente_id;
        this.receptor = this.item.administrador_id;
      }else{
        this.emisor= this.item.administrador_id;
        this.receptor = this.item.cliente_id;
      }
      this.listarMensajes();
      
    }); 
    console.log("INFORMACIÓN DEL CHAT EN EL QUE ESTAMOS:");
    console.log(this.item);   



    this.storage.get('usuario_token').then((token) => {
    
    this.cable = ActionCable.createConsumer(this.server_URL + "/cable?token="+ token);


    this.ChatChannel = this.cable.subscriptions.create({channel: 'ChatChannel', room: this.item.id}, {
        connected: () => {},
        received: (data) =>{
          switch(data.type){
            case 'en_linea':
              this.enlinea = data.data;
              if (this.enlinea == true){
                this.listadoMensajes.forEach((chat, index) => {
                  this.listadoMensajes[index].leido = true;
                });
              }
            break;
            default:
              data.created_at = this.formatearFecha(data.created_at);  
              this.listadoMensajes.push(data);
              console.log("DATA MENSAJES:::::");
              console.log(data);  
              this.leerMensaje(data.id)
              this.irAbajo();
          }
        }
      });
    });
  }



  listarMensajes(){ 
    let ultimo_mensaje = '';
    if(this.listadoMensajes != undefined){
      ultimo_mensaje = "&ultimo_mensaje=" + this.listadoMensajes[0].id;
    }
    this.util.consultaGET("mensajes"+"?chat="+ this.item.id + ultimo_mensaje)    
    .then( (data) =>{
      
      if (this.listadoMensajes != undefined){
        let listadoAuxiliar = this.listadoMensajes;
        this.listadoMensajes = data;
        this.listadoMensajes = this.listadoMensajes.mensajes.reverse();

 

        this.listadoMensajes.forEach((chat, index) => {
          this.listadoMensajes[index].created_at = this.formatearFecha(this.listadoMensajes[index].created_at)
        });
        this.listadoMensajes = this.listadoMensajes.concat(listadoAuxiliar); 
 
      } else{
        this.listadoMensajes = data;
        this.listadoMensajes = this.listadoMensajes.mensajes.reverse(); 
        
        this.listadoMensajes.forEach((chat, index) => {
          this.listadoMensajes[index].created_at = this.formatearFecha(this.listadoMensajes[index].created_at)
        });
      }
      
    
      this.util.quitarCargando();
    });
    
  }

  enviarMensaje(){
    var msg= this.mensaje_form.get("mensaje").value;
    this.mensaje_form.controls['mensaje'].setValue("");
    var json={mensaje: msg, emisor_id: this.emisor, receptor_id: this.receptor, room: this.item.id, leido: this.enlinea};
    this.util.consultaPOST("mensajes", json)    
    .then((data) =>{
      this.mensaje = data;
      this.mensaje.mensaje.created_at = this.formatearFecha(this.mensaje.mensaje.created_at -1);
      this.listadoMensajes.push(this.mensaje.mensaje);
      this.irAbajo();
    });
    
  }

  leerMensaje(id){
    var json={mensaje_id: id};
    this.util.consultaPOST("mensajes/leido", json)    
    .then((data) =>{
      console.log("leido-------------");
      console.log(data);
    });
  }

  cargarMensajesAntiguos(event){
    setTimeout(() => {
      this.pagina = this.pagina + 1;
      this.listarMensajes();
      event.target.complete();
     
    }, 500);
  }

  dismiss() {
    this.ChatChannel.unsubscribe();
    this.modalController.dismiss();
  }

  formatearFecha(fecha_entera){
    moment.locale('es')
    let fecha_actual= moment(moment().format());
    let fecha_anterior=  moment.unix(fecha_entera);
    if (fecha_actual.diff(fecha_anterior, 'day') > 1){
      return fecha_anterior.format("DD/MM/YYYY HH:mm")
    }else{
      return fecha_anterior.fromNow()
    }
  }

  irAbajo(){
    setTimeout(()=>{
      this.content.scrollToBottom(300);
    }, 100);
  }

  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }



}
