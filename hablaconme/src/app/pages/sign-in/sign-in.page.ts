import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormGroup,
  EmailValidator,
} from "@angular/forms";
import { ModalController, ToastController } from "@ionic/angular";
import { UtilService } from "src/app/servicios/util.service";
import { SesionService } from "src/app/servicios/sesion.service";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.page.html",
  styleUrls: ["./sign-in.page.scss"],
})
export class SignInPage implements OnInit {
  public login_form: FormGroup;
  public valor_toggle = false;

  datos_login;
  rol;

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private util: UtilService,
    private sesion: SesionService,
    private router: Router,
    public toastController: ToastController,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private google: GooglePlus,
    private fb: Facebook
  ) {
    this.login_form = this.formBuilder.group({
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"),
        ]),
      ],
      password: ["", Validators.required],
    });
  }

  ngOnInit() {}

  /*
async presentModal(){
  this.valor_toggle= true;
  const modal = await this.modalController.create({
    component: PrivacidadPage,
    componentProps: {}
  });
  return await modal.present();
}
*/

login() {
    var email_api = this.login_form.get("email").value;
    var password_api = this.login_form.get("password").value;
    this.sesion.login(email_api);
    var json = { email: email_api, password: password_api };
    this.util
      .consultaPOSTsinToken("login", json)
      .then((data) => {
        console.log("Respuesta API: ");
        console.log(data);
        this.datos_login = data;
        if (this.datos_login.token) {
          this.storage.set("usuario_token", this.datos_login.token);
          this.storage.set("usuario_primer_login", "false");
          this.sesion.guardarToken(this.datos_login.token);

          this.util.consultaGET("rol").then((data) => {
            this.rol = data;
            console.log("Respuesta: " + data);
            console.log("Rol es: " + this.rol.rol.id);
            this.storage.set("rol", this.rol.rol.id);
            if (this.rol.rol.id == 1) {
              this.router.navigateByUrl("/tabs/tab6");
              this.util.presentarToast("Inicio de sesión correcto","secondary");
            } else {
              this.router.navigateByUrl("/tabs/tab1");
              this.util.presentarToast("Inicio de sesión correcto","secondary");
            }
          });
        }
      })
      .catch((error) => {
        this.util.presentarToast("Los datos introducidos no son correctos, vuelva a intentarlo.","secondary");
      });

    //this.util.consultaGET("rol").then((data) => {});
  }

  loginGoogle() {
    if (this.platform.is('android')) {
      this.loginGoogleAndroid();
    } else {
      this.loginGoogleWeb();
    }
  }

  async loginGoogleWeb() {
    var json;
    /*
    await this.google.login({}).then((d) => {
      if (d && d.email) {
        this.sesion.login(d.email);
        json = { email: d.email, password: d.password };
    }});*/
    await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((d) => {
      if (d && d.user.email) {
        this.sesion.login(d.user.email);
        json = { email: d.user.email, password: d.user.getIdToken()};
    }});;

    this.util
      .consultaPOSTsinToken("login", json)
      .then((data) => {
        console.log("Respuesta API: ");
        console.log(data);
        this.datos_login = data;
        if (this.datos_login.token) {
          this.storage.set("usuario_token", this.datos_login.token);
          this.storage.set("usuario_primer_login", "false");
          this.sesion.guardarToken(this.datos_login.token);

          this.util.consultaGET("rol").then((data) => {
            this.rol = data;
            console.log("Respuesta: " + data);
            console.log("Rol es: " + this.rol.rol.id);
            this.storage.set("rol", this.rol.rol.id);
            if (this.rol.rol.id == 1) {
              this.router.navigateByUrl("/tabs/tab6");
              this.util.presentarToast("Inicio de sesión correcto","secondary");
            } else {
              this.router.navigateByUrl("/tabs/tab1");
              this.util.presentarToast("Inicio de sesión correcto","secondary");
            }
          });
        }
      })
      .catch((error) => {
        this.util.presentarToast("Los datos introducidos no son correctos, vuelva a intentarlo.","secondary");
      });
  }

  async loginGoogleAndroid() {
    const res = await this.google.login({
      'webClientId': '695142026098-nsdcng882ps03htvir61le6sldv26bu1.apps.googleusercontent.com',
      'offline': true
    });
    const resConfirmed = await this.afAuth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken));
  }


  loginFacebook() {
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
