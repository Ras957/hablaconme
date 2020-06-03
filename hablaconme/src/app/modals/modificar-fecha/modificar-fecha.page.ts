import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { UtilService } from 'src/app/servicios/util.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-modificar-fecha',
  templateUrl: './modificar-fecha.page.html',
  styleUrls: ['./modificar-fecha.page.scss'],
})
export class ModificarFechaPage implements OnInit {
  @Input() reserva;
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


  constructor(private modalController: ModalController,
    private util: UtilService,
    private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    console.log("Reserva a modificar: ");
    console.log(this.reserva);

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
  }

  dismiss() {
    this.modalController.dismiss();
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

  modificarVideollamada() {
    let fecha = this.llamada_form.get("fecha").value;
    let hora = this.llamada_form.get("hora").value; 
    let sub_fecha1 = fecha.substr(0,11);
    let sub_hora = hora.substr(11,18);
    let fecha_formateada = sub_fecha1 + sub_hora;
    var fecha_utc = moment.utc(fecha_formateada).format();
    let json = {fecha: fecha_utc,  tipo: "Videollamada", id_eliminar: this.reserva.id}
    this.util.consultaPUT("sesiones/", json)
    .then((data) => {
      this.util.presentAlert("Se ha actualizado la fecha y hora de la reserva.");
      this.dismiss();
    }).catch((data) => {
      this.util.presentarToast("Oops.. parece que algo no ha ido bien");
    }); 
  }
  

  
}
