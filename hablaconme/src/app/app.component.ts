import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { environment, SERVER_URL } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

const ActionCable = require('actioncable');

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  NotificationChannel;
  cable;
  server_URL = SERVER_URL;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService,
    private storage: Storage,
    private toastController: ToastController,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
        }, false);
      });
      this.translate.use('es');
      this.statusBar.overlaysWebView(true);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.subcripcionNotificaciones();
    });
  }


  subcripcionNotificaciones(){
    this.storage.get('usuario_token').then((token) => {
    
      this.cable = ActionCable.createConsumer(this.server_URL + "/cable?token="+ token);
      
      console.log("SUBSCRITO A NOTIFICACIONES:::::::::::::::::::::::::::::");
      console.log(this.cable);
  
      this.NotificationChannel = this.cable.subscriptions.create({channel: 'NotificationChannel', room: "general"}, {
          connected: () => {},
          received: (data) =>{
            switch(data.type){
              case 'en_linea':
                console.log("Esta en linea por tanto no notifico")
              break;
              default:
                console.log("DATA MENSAJES:::::");
                console.log(data);  
                this.localNotifications.schedule({
                  id: 1,
                  title: 'Tienes un nuevo mensaje',
                  text: data.mensaje
                });
            }
          }
        });
      });
  }

  

  
  
  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }


}
