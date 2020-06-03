import { Component, OnInit, ɵConsole } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { UtilService } from 'src/app/servicios/util.service';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { SesionService } from 'src/app/servicios/sesion.service';



@Component({
  selector: 'app-portada',
  templateUrl: './portada.page.html',
  styleUrls: ['./portada.page.scss'],
})
export class PortadaPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  users: any;
  token = "000";
  primerLogin = "";
  rutaBoton = "";
  respuesta_token;
  rol;

  constructor(private translate: TranslateService,
    private route: Router,
    private navCtrl: NavController,
    private util: UtilService,
    private sesion: SesionService,
    private statusBar: StatusBar,
    private storage: Storage,
    private router: Router,
    public loadingController: LoadingController,
    private platform: Platform) {

  }

  ngOnInit() { }

  ionViewDidEnter() {
    //this.mostrarCargando();
    this.statusBar.overlaysWebView(true);
    this.comprobarToken();

    this.platform.backButton.subscribe(async () => {
        navigator['app'].exitApp(); 
});
  }

  ionViewDidLeave(){
    this.platform.backButton.unsubscribe();
  }

  public navegar() {
    this.route.navigateByUrl('tabs');
  }

  getIndex() {
    this.util.consultaGET("login")
      .then(data => {
        this.users = data;
        console.log(this.users);
      });
  }





  comprobarToken() {
    
    this.storage.get('usuario_token').then((val) => {
      if(val){
      this.token = val;
      this.sesion.guardarToken(val);
      console.log("TOKEN: ");
      console.log(val);

      this.util.consultaGET("rol")
      .then(data => {
        this.rol = data;
        console.log("Respuesta: "+ data);
        console.log("Rol es: "+ this.rol.rol.id);
        this.storage.set('rol', this.rol.rol.id );
       
      this.util.consultaGET("token/comprobar")
      .then(data => {
        this.respuesta_token = data;

        if(this.respuesta_token.message = "Token_true"){
          this.storage.get('usuario_primer_login').then((val) => {
            this.primerLogin = val;
            if (this.token != null) {
              if (this.primerLogin == "false") {
                if(this.rol.rol.id  == 1){
                  this.rutaBoton = "tabs/tab6";
                }else{
                 this.rutaBoton = "tabs/tab1";
                }
 
              }else if (this.primerLogin == "true") {
                this.rutaBoton = "primera-sesion";
              }
            }else{
              this.rutaBoton = "sign-up";
            }
            //this.quitarCargando();
          });
        }else{
          this.rutaBoton = "sign-up";
        }
      }).catch((e)=>{
        this.rutaBoton = "sign-up";
      }); //FINAL CONSULTA COMPROBAR TOKEN

      }).catch((e)=>{
        this.rutaBoton = "sign-up";
      }); //FINAL CONSULTA ROL
      }else{
        this.rutaBoton = "sign-up";
      }//Primer if
    });
  }

  async mostrarCargando() {
    const loading = await this.loadingController.create({
      duration: 5000,
      translucent: true
    });
    return await loading.present();
  }

  quitarCargando(){
    setTimeout(() => {
        this.loadingController.dismiss();
    }, 1000);
 
  }




}
