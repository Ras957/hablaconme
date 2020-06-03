import { Component, ɵConsole } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { UtilService } from '../servicios/util.service';
import { SERVER_URL } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarPage } from '../modals/avatar/avatar.page';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PagoPage } from '../modals/pago/pago.page';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page {
  serverURL = SERVER_URL;
  barra_cargando = false;
  datos_usuario;
  public usuario_form: FormGroup;
  public contrasenya_form: FormGroup;

  plan_actual;

  constructor(private menu: MenuController,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private router: Router,
    private storage: Storage) {
    this.util.mostrarCargando();
    this.listarUsuario();
    this.planContratadoActual();

    this.usuario_form = this.formBuilder.group({
      nombre: [""],
      email: [""],
      telefono: [""],
      fecha_nacimiento: [""]
    });

    this.contrasenya_form = this.formBuilder.group({
      contrasenya: [''],
      contrasenyaConfirmacion: ['']
    });
  }




  abreMenu() {
    this.menu.open('end');
  }

  listarUsuario() {
    this.util.consultaGET("usuario")
      .then((data) => {
        this.datos_usuario = data;
        this.datos_usuario = this.datos_usuario.usuario;
        console.log("USUARIO: ");
        console.log(this.datos_usuario);

        this.usuario_form = this.formBuilder.group({
          nombre: [this.datos_usuario.nombre],
          email: [this.datos_usuario.email],
          telefono: [this.datos_usuario.telefono],
          fecha_nacimiento: [this.datos_usuario.fecha_nacimiento]
        });
        this.util.quitarCargando();
        this.barra_cargando = false;
      });
  }

  planContratadoActual() {
    this.util.consultaGET("planescontratados/cliente")
      .then((data) => {
        this.plan_actual = data;
        this.plan_actual = this.plan_actual.plan_contratado_actual[0];
        this.plan_actual.fecha_caducidad = this.fechaFormato(this.plan_actual.fecha_caducidad);
        console.log("EL plan actual es:::::::::::::.");
        console.log(this.plan_actual);
      }).catch((data) => {
        this.plan_actual = [];
      });
  }

  actualiza_campo(campo) {
    let valor = this.usuario_form.get(campo).value;
    var json = { campo: campo, valor: valor };
    this.util.consultaPUT("usuarios", json)
      .then(data => {
      });
  }

  actualizarContrasenya() {
    let contrasenya1 = this.contrasenya_form.get("contrasenya").value;
    let contrasenya2 = this.contrasenya_form.get("contrasenyaConfirmacion").value;
    if (contrasenya1 == contrasenya2) {
      console.log("CONTRASEÑAS VALIDAS");

      var json = { user_id: this.datos_usuario.id, contrasenya: contrasenya1 };
      this.util.consultaPUT("login/cambiar-contrasenya", json)
        .then(data => {
          console.log(data);
          this.storage.set('usuario_token', null );
          this.util.presentarToast("La contraseña ha sido actualizada, por favor vuelve a iniciar sesión", "success")
          this.router.navigateByUrl('/');
        }).catch(data => {
          this.util.presentarToast("Ha ocurrido un error al cambiar la contraseña","danger")
        });
    } else {
      this.util.presentarToast("Las contraseñas no coinciden","danger")
    }
  }

  fechaFormato(fecha){
    moment.locale('es');
    return moment(fecha).format("DD [de] MMMM [de] YYYY");
  
  }

  async presentModalImagenAvatar() {
    const modal = await this.modalController.create({
      component: AvatarPage,
      componentProps: {}
    });
    modal.onDidDismiss()
      .then((data) => {
        this.barra_cargando = true;
        setTimeout(() => {
          this.listarUsuario();
        }, 1000);
      });
    return await modal.present();
  }

  async presentModalPago() {
    console.log("PLAN ACTUAL:");
    console.log(this.plan_actual);
    const modal = await this.modalController.create({
      component: PagoPage,
      componentProps: {datos_pago: this.plan_actual}
    });
    return await modal.present();
  }

  async presentModalPagoActualizar(nombre_plan) {
    
    let plan = {
      nombre: nombre_plan,
      modalidad: "anual",
      precio: "null"
    }
    const modal = await this.modalController.create({
      component: PagoPage,
      componentProps: {datos_pago: plan}
    });
    return await modal.present();
  }



  doRefresh(event) {
    this.barra_cargando = true;
    setTimeout(() => {
      this.listarUsuario();
      this.planContratadoActual();
      event.target.complete();
    }, 1000);
  }
}
