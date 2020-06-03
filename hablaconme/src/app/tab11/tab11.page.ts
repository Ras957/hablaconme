import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { UtilService } from '../servicios/util.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab11',
  templateUrl: 'tab11.page.html',
  styleUrls: ['tab11.page.scss']
})
export class Tab11Page {
  listadoDisponibilidades;
  listadoExcepciones;
  barra_cargando = false;

  datetime_min;
  datetime_max;
  datetime_hora;

  fecha_excepcion;
  hora_excepcion;

  constructor(private util: UtilService) {
    this.util.mostrarCargando();
    this.listarExcepciones();
    this.listarDisponibilidades();
    
    let maximo = moment(moment().format());
    maximo.add(7, 'days').calendar();
    this.datetime_max = maximo.format('YYYY-MM-DD');
    console.log("FECHAMOMENT: " + this.datetime_max);

    this.datetime_min = moment().format('YYYY-MM-DD');
    console.log("Día: " + this.datetime_min);

    let hora = moment(moment().format());
    hora.add(1, 'hours').calendar();
    this.datetime_hora = hora.format('hh');
    console.log("Hora: " + this.datetime_hora);

  }


  listarDisponibilidades() {
    this.util.consultaGET("disponibilidades")
      .then((data) => {
        console.log("error 2");
        console.log(data);
        this.listadoDisponibilidades = data;
        this.util.quitarCargando();
        this.barra_cargando = false;

      });
  }

  listarExcepciones() {
    this.util.consultaGET("excepciones")
      .then((data) => {
        this.listadoExcepciones = data;
        this.listadoExcepciones = this.listadoExcepciones.excepciones;
        this.listadoExcepciones.forEach((excepcion, index) => {
          this.listadoExcepciones[index].fecha = moment(this.listadoExcepciones[index].fecha).format("DD/MM/YYYY HH:mm");
        });
        this.barra_cargando = false;
      });
  }

  actualizarDisponibilidad(item) {
    if (item.valor == true) {
      var valor_update = false
    } else {
      var valor_update = true
    }
    var json = { id: item.id, valor: valor_update };
    this.util.consultaPUT("disponibilidades", json)
      .then(data => {
        this.barra_cargando = true;
        setTimeout(() => {
          this.listarDisponibilidades();
        }, 1000);
      });
  }



  cambioFechaExepcion(evento) {
    this.fecha_excepcion = evento.detail.value;
  }

  /*
  cambioHoraExepcion(evento){
    console.log("EVENTO HORA:::::::::::");
    console.log(evento.detail.value);
    this.hora_excepcion = evento.detail.value;
  }
  */

  ayadirExcepcion() {
    var json = { fecha: this.fecha_excepcion };
    this.util.consultaPOST("excepciones", json)
      .then(data => {
        console.log(data);
        this.barra_cargando = true;
        setTimeout(() => {
          this.listarExcepciones();
        }, 1000);
      });




    /* 
    let timestamp = moment(this.fecha_excepcion).format("X");
    console.log(timestamp);
    console.log("Fecha: ");
    let sub_fecha1 = this.fecha_excepcion.substr(0,10);
    console.log(sub_fecha1);

    let sub_fecha2 = this.fecha_excepcion.substr(16,24);
    console.log(sub_fecha2);

    console.log("Hora: ");
    console.log(this.hora_excepcion);

    console.log("Formato para enviar: ");
    let fecha_formateada = sub_fecha1 + "T" + this.hora_excepcion + sub_fecha2;
    console.log(fecha_formateada);
*/

  }

  eliminarExcepcion(item) {
    this.barra_cargando = true;
    this.util.consultaDELETE("excepciones/" + item.id)
      .then((data) => {
        console.log(data);
        this.listarExcepciones();
      });
  }


  doRefresh(event) {
    this.barra_cargando = true;
    setTimeout(() => {
      this.listarDisponibilidades();
      event.target.complete();
    }, 1000);
  }


}
