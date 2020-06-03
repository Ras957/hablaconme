import { Component } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SesionService } from '../servicios/sesion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from '../servicios/util.service';
import * as moment from 'moment';
import { SERVER_URL } from 'src/environments/environment';
import { AvatarPage } from '../modals/avatar/avatar.page';
import { PagoPage } from '../modals/pago/pago.page';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public admin=false;
  public preferencias_form: FormGroup;
  public usuario_form: FormGroup;
  public contrasenya_form: FormGroup;
  datos_usuario;
  datos_usuario_personales;
  plan_actual;

  serverURL = SERVER_URL;

  constructor(private menu: MenuController,
    private storage: Storage,
    private router: Router,
    private formBuilder: FormBuilder,
    private sesion: SesionService,
    private util: UtilService,
    private modalController: ModalController) {
  }
  
  async ionViewWillEnter(){
    this.storage.get('rol').then((val) => {
      
      if(val === 2){
        this.admin = false;
        this.listarPreferencias();
        this.planContratadoActual();
      }else if (val === 1){
        this.admin= true;
        this.listarUsuario();
      }else{
        this.admin = false;
        this.router.navigateByUrl('/tabs/tab1');
        this.menu.close()
        this.menu.enable(false)
      } /* 
      if (val === 1){
        this.admin= true;
        this.listarUsuario();
      }else if (val === 2){
        this.admin = false;
        this.listarPreferencias();
        this.planContratadoActual();
        console.log("error de PLAN")
        console.log(this.plan_actual);
        if (this.plan_actual){
          //this.listarPreferencias();
          this.router.navigateByUrl('/tabs/tab1');
        }else{
          this.router.navigateByUrl('/primera-sesion');
          this.menu.close();
          this.menu.enable(false);
        }
      }else{
        this.util.presentarToast("Error al detectar tu rol","secondary");
      }*/
    }); 

    this.preferencias_form = this.formBuilder.group({
      movil_recordatorio_videollamada: [""],
      movil_recordatorio_llamada: [""],
      movil_mensajes_chat: [""],
      movil_cosas_nuevas: [""],
      email_recordatorio_videollamada: [""],
      email_recordatorio_llamada: [""],
      email_mensajes_chat: [""],
      email_cosas_nuevas: [""],
      pago_automatico: [""]
    });

    this.usuario_form = this.formBuilder.group({
      nombre: [""]    });

    this.contrasenya_form = this.formBuilder.group({
      contrasenya: ['',Validators.required],
      contrasenyaConfirmacion: ['',Validators.required]
    });
  }


  async listarPreferencias() {
    console.log("listando preferencias...")
    this.util.consultaGET("usuario/preferencias")
      .then((data) => {
        this.datos_usuario = data;  
        console.log(data);
        this.datos_usuario = this.datos_usuario.usuario;
        
        this.preferencias_form.setValue({
          movil_recordatorio_videollamada: this.datos_usuario.movil_recordatorio_videollamada,
          movil_recordatorio_llamada: this.datos_usuario.movil_recordatorio_llamada,
          movil_mensajes_chat: this.datos_usuario.movil_mensajes_chat,
          movil_cosas_nuevas: this.datos_usuario.movil_cosas_nuevas,
          email_recordatorio_videollamada: this.datos_usuario.email_recordatorio_llamada,
          email_recordatorio_llamada: this.datos_usuario.email_recordatorio_llamada,
          email_mensajes_chat: this.datos_usuario.email_mensajes_chat,
          email_cosas_nuevas: this.datos_usuario.email_cosas_nuevas,
          pago_automatico: this.datos_usuario.pago_automatico
        })
      }).catch(err =>{
        console.log("No se pudieron cargar las preferencias")
      });
  }

  listarUsuario() {
    this.util.consultaGET("usuario")
      .then((data) => {
        this.datos_usuario_personales = data;
        this.datos_usuario_personales = this.datos_usuario_personales.usuario;
        console.log("USUARIO: ");
        console.log(this.datos_usuario_personales);

        this.usuario_form = this.formBuilder.group({
          nombre: [this.datos_usuario_personales.nombre]        }); 
      });
  }

  planContratadoActual() {
    this.util.consultaGET("planescontratados/cliente")
      .then((data) => {
        this.plan_actual = data;
        this.plan_actual = this.plan_actual.plan_contratado_actual[0];
        this.plan_actual.fecha_caducidad = this.fechaFormato(this.plan_actual.fecha_caducidad);
        //this.storage.set('plan',this.plan_actual.nombre);
        console.log(data);
        console.log("EL plan actual es:::::::::::::.");
        console.log(this.plan_actual);
        console.log("error 6");
        console.log(this.plan_actual.nombre);
        console.log(this.storage.get("plan"));
        //console.log(this.sesion.getPlan());
      }).catch((data) => {
        this.plan_actual = {};
        console.log("Error en el plan elegido");
      });
  }
  
  fechaFormato(fecha){
    moment.locale('es');
    return moment(fecha).format("DD [de] MMMM [de] YYYY");
  
  }

  actualiza_campo(campo, evento) {
    let valor = this.preferencias_form.get(campo).value;
    var json = { campo: campo, valor: valor };

    this.util.consultaPUT("usuarios", json)
      .then(data => {
      }).catch(err=>{
        console.log("No hay datos");
      });

  }

  cerrarMenu(){
    this.menu.close('end');
  }


  cerrarSesion(){
    this.storage.set('usuario_token', null );
    //this.storage.set('usuario_primer_login', "true" );
    this.router.navigateByUrl('/');

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
          this.util.presentarToast("La contraseña ha sido actualizada, por favor vuelve a iniciar sesión")
          this.router.navigateByUrl('/');
        }).catch(data => {
          this.util.presentarToast("Ha ocurrido un error al cambiar la contraseña")
        });
    } else {
      this.util.presentarToast("Las contraseñas no coinciden")
    }
  }


  async presentModalImagenAvatar() {
    const modal = await this.modalController.create({
      component: AvatarPage,
      componentProps: {}
    });
    modal.onDidDismiss()
      .then((data) => {
          this.listarUsuario();
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
}
