import { Component } from "@angular/core";
import { MenuController, AlertController } from "@ionic/angular";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UtilService } from "../servicios/util.service";
import { SERVER_URL } from "src/environments/environment";
import { Storage } from "@ionic/storage";
import { SesionService } from '../servicios/sesion.service';

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  serverURL = SERVER_URL;
  public plan;
  public reserva_videollamada = true;
  public tiempo_espera_videollamada = true;

  public rangos_form: FormGroup;
  public rangocli1 = 0;

  public meta_activa;
  public metas_finalizadas;
  barra_cargando = false;

  constructor(
    private menu: MenuController,
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private util: UtilService,
    private sesion: SesionService) {
    this.rangos_form = this.formBuilder.group({
      rango1: ["", Validators.required],
      rango2: ["", Validators.required],
    });

    //this.plan= '3D';
    this.comprobarPlan();
    this.reserva_videollamada = false;
    this.tiempo_espera_videollamada = true;
    this.util.mostrarCargando();
    this.listarMetas();
  }

  abreMenu() {
    this.menu.open("end");
  }

  comprobarPlan(){
    this.sesion.getPlan(this.plan);
  }


  rangoCliente() {
    this.rangocli1 = this.rangos_form.get("rango1").value;
    if (this.rangocli1 == 100) {
      this.presentAlert_Meta();
    }
  }

  actualizarProgreso() {
    this.rangocli1 = this.rangos_form.get("rango1").value;
    let json = {
      meta_id: this.meta_activa[0].id,
      progreso_cliente: this.rangocli1,
    };
    console.log(json);
    this.util.consultaPUT("meta/progreso", json).then((data) => {
      console.log(data);
    });
  }

  listarMetas() {
    console.log("aquiiiiii");
    console.log(this.plan);
    if (this.plan == "3D") {
      this.util
        .consultaGET("metas/cliente")
        .then((data) => {
          this.meta_activa = data;
          console.log("error de metas");
          console.log(data);
          this.metas_finalizadas = this.meta_activa.metas_finalizadas;
          this.meta_activa = this.meta_activa.metas_activas;

          this.rangos_form.setValue({
            rango1: this.meta_activa[0].progreso_cliente,
            rango2: this.meta_activa[0].progreso_admin,
          });
          this.util.quitarCargando();
          this.barra_cargando = false;
        })
        .catch((data) => {
          this.util.quitarCargando();
          this.barra_cargando = false;
        });
    }
  }

  async presentAlert_Meta() {
    const alert = await this.alertController.create({
      header: "¡Felicidades!",
      cssClass: "alert_meta",
      message: "Has completado una nueva meta",
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
    }, 3000);
  }

  doRefresh(event) {
    this.barra_cargando = true;
    setTimeout(() => {
      this.listarMetas();
      event.target.complete();
    }, 1000);
  }
}
