import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SERVER_URL } from '../../environments/environment';
import { SesionService } from './sesion.service';
import { Storage } from '@ionic/storage';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private static miUtil: UtilService = undefined;
  private archivoAPIUrls = 'assets/data/api.json';


  apiUrl = SERVER_URL;
  token = ""

  constructor(public http: HttpClient,
    public sesion: SesionService,
    private storage: Storage,
    private loadingController : LoadingController,
    public alertController: AlertController,
    private toastController: ToastController) {
    console.log("Dentro del servicio API: " + this.apiUrl);
    this.getIndex()
  }


  getIndex() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl + '/').subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public obtenerURLAPI(tipoUrl) {
    return this.apiUrl + '/' + tipoUrl;

  }

  public consultaGET(url) {
    let headers = this.obtenerToken();
    return this.http.get(this.obtenerURLAPI(url), { headers: headers }).toPromise();
  }



  public consultaPOST(url, body) {
    let headers = this.obtenerToken();
    return this.http.post(this.obtenerURLAPI(url), body, { headers: headers }).toPromise();

  }


  public consultaPOSTsinToken(url, body) {

    return this.http.post(this.obtenerURLAPI(url), body).toPromise();

  }

  public consultaPOSTImagen(url, file) {
    let headers = this.obtenerToken();
    let formData = new FormData();
    formData.append('imagen', file, file.name);
    return this.http.post(this.obtenerURLAPI(url), formData, { headers: headers }).toPromise();
  }

  public consultaPUT(url, body) {
    let headers = this.obtenerToken();
    return this.http.put(this.obtenerURLAPI(url), body, { headers: headers }).toPromise();
  }

  public consultaDELETE(url) {
    let headers = this.obtenerToken();
    return this.http.delete(this.obtenerURLAPI(url), { headers: headers }).toPromise();
  }

  /*HAY QUE PONER EL HEADER EN TODAS LAS CONSULTAS QUE REALIZEMOS A LA API*/
  private obtenerToken() {
    let headers = new HttpHeaders({
      "Authorization": this.sesion.obtenerToken()
    });
    return headers;

  }

  /*public consultarPlan():any{
    this.storage.get('plan').then((p)=>{
      var plan =JSON.parse(p);
      return plan;
    });
  }*/


  async mostrarCargando() {
    const loading = await this.loadingController.create({
      duration: 5000,
      spinner: 'crescent',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  quitarCargando(){
    setTimeout(() => {
        this.loadingController.dismiss();
    }, 500);
 
  }

  async presentAlert(msg){
    const alert = await this.alertController.create({
      cssClass:'alert',
      message: msg,

    });
    await alert.present();
    setTimeout(()=>{alert.dismiss();}, 3000);
  }

  async presentAlertError(msg){
    const alert = await this.alertController.create({
      cssClass:'alert_pago_error',
      message: msg,

    });
    await alert.present();
    setTimeout(()=>{alert.dismiss();}, 3000);
  }

  /*
  async presentarToast(msg){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }*/

  async presentarToast(msg:string, col:string="secondary", dur:number=2000):Promise<void> {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: col,
      //showCloseButton: true
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
  



}
