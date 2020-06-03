import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { PrivacidadPage } from "src/app/modals/privacidad/privacidad.page";
import {
  Validators,
  FormBuilder,
  FormGroup,
  EmailValidator,
} from "@angular/forms";
import { UtilService } from "src/app/servicios/util.service";
import { SesionService } from "src/app/servicios/sesion.service";
import { Router } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { actionCodeSettings } from 'src/environments/environment';

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
  public registro_form: FormGroup;
  public valor_toggle = false;
  users: any;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private sesion: SesionService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private google: GooglePlus,
    private fb: Facebook
  ) {
    this.registro_form = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      privacidad: [undefined, Validators.required],
    });
  }
  ngOnInit() {}

  async presentModal() {
    this.valor_toggle = true;
    const modal = await this.modalController.create({
      component: PrivacidadPage,
      componentProps: {},
    });
    return await modal.present();
  }

  async sendVerificationEmail(){
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  registro() {
    this.util.mostrarCargando();
    var email_api = this.registro_form.get("email").value;
    this.sesion.login(email_api);
    var json = { email: email_api };
    this.afAuth.sendSignInLinkToEmail(email_api,actionCodeSettings);
    this.util
      .consultaPOSTsinToken("registro", json)
      .then((data) => {
        console.log("Respuesta API: ");
        console.log(data);
        this.util.quitarCargando();
        this.router.navigateByUrl("/codigo");
      })
      .catch((err) => {
        console.log("No se pudo registrar");
      });
  }

  async registroGoogle() {
    this.util.mostrarCargando();
    var json;
    await this.google.login({}).then((d) => {
      if (d && d.email) {
        this.sesion.login(d.email);
        json = { email: d.email };
      }});
      this.util
          .consultaPOSTsinToken("registro", json)
          .then((data) => {
            console.log("Respuesta API: ");
            console.log(data);
            this.util.quitarCargando();
            this.router.navigateByUrl("/codigo");
          })
          .catch((err) => {
            console.log("No se pudo registrar");
          });
  }


  registroFacebook() {
    try {
      this.fb
        .login(["public_profile", "user_friends", "email"])
        .then((res: FacebookLoginResponse) =>
          console.log("Logged into Facebook!", res)
        )
        .catch((e) => console.log("Error logging into Facebook", e));

      this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
    } catch (err) {
      console.log(err);
    }
  }

  
}
