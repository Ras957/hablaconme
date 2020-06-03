import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PagoPage } from 'src/app/modals/pago/pago.page';
import { AvatarPage } from 'src/app/modals/avatar/avatar.page';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { UtilService } from 'src/app/servicios/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SERVER_URL } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-primera-sesion',
  templateUrl: './primera-sesion.page.html',
  styleUrls: ['./primera-sesion.page.scss'],
})
export class PrimeraSesionPage implements OnInit {
  buttonColor1: string = '#F9F9F9';
  colorText1: string = '#768590';
  buttonColor2: string = "linear-gradient(160.56deg, #FDDA24 0, #D9017A 99.99%, #D9017A 100%)";
  colorText2: string = "#FFFFFF";
  buttonColor3: string = '#F9F9F9';
  colorText3: string = '#768590';

  filter_bn_1: string = 'none';
  filter_bn_2: string = 'grayscale(100%)';
  filter_default: string = 'none';

  precios_select = 2;

  public reserva_videollamada= false;
  public reserva_llamada= false;
  public tiempo_espera_videollamada= true;
  primer_pago = false;
  utc_formato;
  datetime_min;
  datetime_max;
  datetime_hora;
  public llamada_form: FormGroup;
  listadoHoras;
  horasDisponibles = [];
  noHoras = false;
  info_usuarios;
  proxima_llamada;
  proxima_videollamada;
  sesiones_pasadas;
  barra_cargando= false;
  serverURL = SERVER_URL;


  constructor(private modalController: ModalController,
    private statusBar: StatusBar,
    private storage: Storage,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    let utc = moment().utcOffset();
    this.utc_formato = (utc / 60);

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

    this.actualizarAdministrador(1);
    
  }


  ionViewDidEnter() {
    this.statusBar.backgroundColorByName("white");
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
  

  }


  public seleccionar_persona(number) {
    if (number == 1) {
      this.filter_bn_2 = 'grayscale(100%)';
      this.filter_bn_1 = 'none';
      //CAMBIAR NÚMERO ADMINISTRADOR POR ID 1 E ID 2 QUE SON LOS REALES QUE SE VAN A USAR
      this.actualizarAdministrador(1);
      this.horasDisponibles = [];
      this.noHoras = false;
    } else {
      this.filter_bn_1 = 'grayscale(100%)';
      this.filter_bn_2 = 'none';
       //CAMBIAR NÚMERO ADMINISTRADOR POR ID 1 E ID 2 QUE SON LOS REALES QUE SE VAN A USAR
      this.actualizarAdministrador(2);
      this.horasDisponibles = [];
      this.noHoras = false;

    }
  }

  actualizarAdministrador(id){
    var json = { campo: "administrador_id", valor: id };
    this.util.consultaPUT("usuarios", json)
      .then(data => {
        console.log("Administrador elegido correctamente");
        this.listarSesiones();
      });
  }


  listarHoras() {
    moment.locale('es')
    let fecha = this.llamada_form.get("fecha").value;
    let dia = moment(fecha).format("dddd");
    let json = { fecha: fecha, dia: dia }
    this.util.consultaPOST("sesiones/disponibles", json)
      .then((data) => {
        this.noHoras = true;
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
      this.info_usuarios= data;
      if(this.info_usuarios.inicial.length > 0){
        this.reserva_videollamada = true;   
        this.proxima_videollamada = this.info_usuarios.inicial[0];  
        this.fecha(this.proxima_videollamada.fecha);
        this.proxima_videollamada.fecha = this.fechaFormato(this.proxima_videollamada.fecha); 
      }
      this.info_usuarios = this.info_usuarios.usuarios;
      this.util.quitarCargando();
      this.barra_cargando = false;
      console.log("Listado de sesiones del cliente:::::::::::");
      console.log(data);
    }).catch((data) => {
      this.util.quitarCargando();
      this.barra_cargando = false;
    });
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



  public color(number) {
    if (number == 1) {
      this.buttonColor1 = "linear-gradient(160.56deg, #FDDA24 0, #D9017A 99.99%, #D9017A 100%)";
      this.colorText1 = "#FFFFFF";
      this.buttonColor2 = '#F9F9F9';
      this.colorText2 = '#768590';
      this.buttonColor3 = '#F9F9F9';
      this.colorText3 = '#768590';
      this.precios_select = 1;
    }
    else if (number == 2) {
      this.buttonColor2 = "linear-gradient(160.56deg, #FDDA24 0, #D9017A 99.99%, #D9017A 100%)";
      this.colorText2 = "#FFFFFF";
      this.buttonColor1 = '#F9F9F9';
      this.colorText1 = '#768590';
      this.buttonColor3 = '#F9F9F9';
      this.colorText3 = '#768590';
      this.precios_select = 2;
    }
    else {
      this.buttonColor3 = "linear-gradient(160.56deg, #FDDA24 0, #D9017A 99.99%, #D9017A 100%)";
      this.colorText3 = "#FFFFFF";
      this.buttonColor1 = '#F9F9F9';
      this.colorText1 = '#768590';
      this.buttonColor2 = '#F9F9F9';
      this.colorText2 = '#768590';
      this.precios_select = 3;
    }
  }

  async presentModal() {

  let fecha = this.llamada_form.get("fecha").value;
  let hora = this.llamada_form.get("hora").value; 
  let sub_fecha1 = fecha.substr(0,11);
  let sub_hora = hora.substr(11,18);
  let fecha_formateada = sub_fecha1 + sub_hora;
  var fecha_utc = moment.utc(fecha_formateada).format();
  let json = {fecha: fecha_utc,  tipo: "Inicial"}
  
    //qUITAR EL PRIMER LOGIN CUANDO TENGA LA PRIMERA SESION NO AQUI!!!!!!!!!!!!!!!
    //this.storage.set('usuario_primer_login', 'false' );
    const modal = await this.modalController.create({
      component: PagoPage,
      componentProps: {inicial : json}
    });  
    modal.onDidDismiss()
    .then((data) => {
      this.primer_pago = true;
  
      });
    return await modal.present();
  }

  primeraSesion(){
        this.storage.set('usuario_primer_login', 'false' );
        this.router.navigateByUrl('/entrar-videollamada');
  }

  async presentModalAvatar() {
    const modal = await this.modalController.create({
      component: AvatarPage,
      componentProps: {}
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
