import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';
import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-llamada',
  templateUrl: './llamada.page.html',
  styleUrls: ['./llamada.page.scss'],
})
export class LlamadaPage implements OnInit {

  listadoUsuarios;
  listadoHoras;
  horasDisponibles = [];
  imagenPerfil = "./assets/imgs/avatar_mujer.svg";
  serverURL = SERVER_URL;

  usuario = "";
  fecha = "";
  hora = "";

  datetime_min;
  datetime_max;
  datetime_hora;
  utc_formato;

  public llamada_form: FormGroup;

  constructor(private modalController: ModalController,
    private util: UtilService,
    private formBuilder: FormBuilder) {


    this.llamada_form = this.formBuilder.group({
      usuario: ["", Validators.required],
      fecha: ["", Validators.required],
      hora: ["", Validators.required],
      telefono: ["", Validators.required]
    });



    let maximo = moment(moment().format());
    maximo.add(7, 'days').calendar();
    this.datetime_max = maximo.format('YYYY-MM-DD');
    console.log("FECHAMOMENT: " + this.datetime_max);

    let minimo = moment(moment().format());
    minimo.add(1, 'days').calendar();
    this.datetime_min = minimo.format('YYYY-MM-DD');
    console.log("Día: " + this.datetime_min);

    let hora = moment(moment().format());
    hora.add(1, 'hours').calendar();
    this.datetime_hora = hora.format('hh');
    console.log("Hora: " + this.datetime_hora);

    let utc = moment().utcOffset();
    this.utc_formato = (utc/60);
  }

  ngOnInit() {
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
        console.log("Listado Usuarios: ################");
        console.log(this.listadoUsuarios);

      });
  }

  getUsuario(usuario) {
    this.usuario = usuario.detail.value;
    this.listadoUsuarios.forEach(element => {
      if (element.id == usuario.detail.value) {
        this.imagenPerfil = this.serverURL + element.avatar;
      }
    });
  }

  getFecha(fecha) {
    console.log(fecha.detail.value);
    this.fecha = fecha.detail.value;

  }

  getHora(hora) {
    console.log(hora.detail.value);
    this.hora = hora.detail.value;
  }

  listarHoras(){
    moment.locale('es')
    let fecha = this.llamada_form.get("fecha").value;
    let dia = moment(fecha).format("dddd");
    let json = {fecha: fecha, dia: dia}
    this.util.consultaPOST("sesiones/disponibles", json)
      .then((data) => {
        this.horasDisponibles = []
        this.listadoHoras = data;
        this.listadoHoras = this.listadoHoras.disponibilidades;
        this.listadoHoras.forEach(element => {
          this.horasDisponibles.push(element.hora + this.utc_formato);
        });
        console.log("Listado Horas DISPONIBLES: ################");
        console.log(data);

      });
  }


  crearLlamada() {
    let fecha = this.llamada_form.get("fecha").value;
    let hora = this.llamada_form.get("hora").value;   
    let usuario = this.llamada_form.get("usuario").value;
    let telefono = this.llamada_form.get("telefono").value;

  
    let sub_fecha1 = fecha.substr(0,11);
    let sub_hora = hora.substr(11,18);
    let fecha_formateada = sub_fecha1 + sub_hora;

    console.log("Fecha en UTC:");
    var fecha_utc = moment.utc(fecha_formateada).format();
    console.log(fecha_utc);
    
    let json = {fecha: fecha_utc, usuario_id: usuario, telefono: telefono, tipo: "Llamada"}
    this.util.consultaPOST("sesiones/", json)
    .then((data) => {
      console.log("Llamada creada: ################");
      console.log(data);
      this.util.presentAlert("La llamada se creó correctamente.");
      this.dismiss();
    }).catch((data) => {
      this.util.presentAlertError("Oops.. parece que algo no ha ido bien");
    });


  }

}
