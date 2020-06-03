import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ModificarFechaPage } from '../modals/modificar-fecha/modificar-fecha.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { UtilService } from 'src/app/servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EntrarVideollamadaPage } from '../pages/entrar-videollamada/entrar-videollamada.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
public plan="3D";
public reserva_videollamada= false;
public reserva_llamada= false;
public tiempo_espera_videollamada= true;
public llamada_form: FormGroup;
datetime_min;
datetime_max;
datetime_hora;

listadoHoras;
horasDisponibles = [];
noHoras= false;
serverURL= SERVER_URL;
info_usuarios;
proxima_llamada;
proxima_videollamada;
sesiones_pasadas;
utc_formato;
barra_cargando= false;


constructor(private menu: MenuController, 
  private modalController: ModalController, 
  private statusBar: StatusBar,
  private storage: Storage,
  private util: UtilService,
  private formBuilder: FormBuilder,
  private router: Router){

  this.plan= '3D';
  //this.reserva_videollamada= true;
  //this.tiempo_espera_videollamada= true;


  let utc = moment().utcOffset();
  this.utc_formato = (utc/60);

  this.util.mostrarCargando();
  this.listarSesiones();

  this.llamada_form = this.formBuilder.group({
    fecha: ["", Validators.required],
    hora: ["", Validators.required]
  });


  let maximo = moment(moment().format());
  maximo.add(7, 'days').calendar();
  this.datetime_max = maximo.format('YYYY-MM-DD');

  let minimo = moment(moment().format());
  minimo.add(1, 'days').calendar();
  this.datetime_min = minimo.format('YYYY-MM-DD');

  let hora = moment(moment().format());
  hora.add(1, 'hours').calendar();
  this.datetime_hora = hora.format('hh');


}

ionViewDidEnter(){
    this.statusBar.overlaysWebView(false);
  this.statusBar.styleDefault();
  this.statusBar.backgroundColorByName("white");

  this.storage.get('usuario_token').then((val) => {
    console.log('El token de usuario guardado en local es: ', val);
  });
}

listarHoras(){
  moment.locale('es')


  let fecha = this.llamada_form.get("fecha").value;
  let dia = moment(fecha).format("dddd");
  let json = {fecha: fecha, dia: dia}
  this.util.consultaPOST("sesiones/disponibles", json)
    .then((data) => {
      this.noHoras= true;
      this.horasDisponibles = []
      this.listadoHoras = data;
      this.listadoHoras = this.listadoHoras.disponibilidades;
      this.listadoHoras.forEach(element => {
        this.horasDisponibles.push(element.hora + this.utc_formato);
      });
    });
}

listarSesiones(){
  this.util.consultaGET("sesiones/cliente")
    .then((data) => {
      console.log("SESIONES:::::::::::::::::::::::::::::::::::");
      console.log(data);
      this.info_usuarios= data;
      if(this.info_usuarios.videollamada.length > 0){
        this.reserva_videollamada = true;   
        this.proxima_videollamada = this.info_usuarios.videollamada[0];  
        this.fecha(this.proxima_videollamada.fecha);
        this.proxima_videollamada.fecha = this.fechaFormato(this.proxima_videollamada.fecha); 
      }
      if(this.info_usuarios.llamada.length > 0){
        this.reserva_llamada = true;   
        this.proxima_llamada = this.info_usuarios.llamada[0];
        this.proxima_llamada.fecha = this.fechaFormato(this.proxima_llamada.fecha);
      }
      this.sesiones_pasadas = this.info_usuarios.sesiones_pasadas;
      this.info_usuarios = this.info_usuarios.usuarios;
      this.sesiones_pasadas.forEach(sesion => {
        sesion.fecha = this.fechaFormato(sesion.fecha);
      });

  

      this.util.quitarCargando();
      this.barra_cargando = false;
    }).catch((data) => {
      this.util.quitarCargando();
      this.barra_cargando = false;
    });
}



crearVideollamada() {
  let fecha = this.llamada_form.get("fecha").value;
  let hora = this.llamada_form.get("hora").value; 
  let sub_fecha1 = fecha.substr(0,11);
  let sub_hora = hora.substr(11,18);
  let fecha_formateada = sub_fecha1 + sub_hora;
  var fecha_utc = moment.utc(fecha_formateada).format();
  let json = {fecha: fecha_utc,  tipo: "Videollamada"}
  this.util.consultaPOST("sesiones/", json)
  .then((data) => {
    this.reserva_videollamada= true;
    this.util.presentAlert("La videollamada se reservó correctamente.");
    this.barra_cargando= true;
    this.listarSesiones();
  }).catch((data) => {
    this.util.presentarToast("Oops.. parece que algo no ha ido bien");
  }); 
}

entrarVideollamada(){
  //this.router.navigateByUrl('/entrar-videollamada');
  this.presentModalVideollamada();
}

async presentModalVideollamada(){
  const modal = await this.modalController.create({
    component: EntrarVideollamadaPage,
    componentProps: {videollamada : this.proxima_videollamada}
  });
  return await modal.present();
}

fecha(fecha){    
  moment.locale('es');
  let fecha_actual= moment(moment().format());
  let fecha_anterior=  moment(fecha);
  if (fecha_anterior.diff(fecha_actual, 'minutes') < 10){
   this.tiempo_espera_videollamada = false;
  }else{
    this.tiempo_espera_videollamada = true;
  }
}

fechaFormato(fecha){
  moment.locale('es');
  return moment(fecha).format("dddd DD [de] MMMM [a las] HH:mm [(UTC+"+this.utc_formato+")]");

}


abreMenu(){
  this.menu.open('end');
}

async presentModalModificarFecha(){
  const modal = await this.modalController.create({
    component: ModificarFechaPage,
    componentProps: {reserva: this.proxima_videollamada}
  });
  modal.onDidDismiss()
  .then((data) => {
    this.listarSesiones;

    });
  return await modal.present();
}

doRefresh(event){
  this.barra_cargando= true;
  setTimeout(() => {
    this.listarSesiones(); //CAMBIAR POR METODO ACTUALIZAR LISTADO
    event.target.complete();
  }, 1000);
}


}
