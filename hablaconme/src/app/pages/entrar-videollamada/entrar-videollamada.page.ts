import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';



declare var OT: any;
@Component({
  selector: 'app-entrar-videollamada',
  templateUrl: './entrar-videollamada.page.html',
  styleUrls: ['./entrar-videollamada.page.scss'],
})
export class EntrarVideollamadaPage implements OnInit {
  @Input() videollamada;
  session: any;
  publisher: any;
  apiKey: string;
  sessionId: string;
  token: string;
  cameraSource = 0;
  devices: any[];



  
  constructor(private router: Router,
    private modalController: ModalController,
    private androidPermissions: AndroidPermissions ) { 
  
  }

 

  ngOnInit() {

        // Replace these values with those generated in your TokBox Account
        this.apiKey = this.videollamada.api_key;
        console.log("APIKEY:::::::::::::::::::::::: " + this.apiKey);
        this.sessionId= this.videollamada.sesion;
        this.token = this.videollamada.token;

        //Comprobamos los permisos de la cámara y micrófono y realizamos la llamada
        this.comprobarPermisos();
        
  
      }

  // Starts Call
  startCall() {
    this.session = OT.initSession(this.apiKey, this.sessionId);

 
    // Subscribe to a newly created stream
 
    this.session.on('streamCreated', (event) => {

       this.session.subscribe(event.stream, 'subscriber', {
        insertMode: 'append',
        resolution: '1280x720',
        showControls: false,
        width: '100%',
        height: '100%'
      });
      
    }); 

    this.session.on('sessionDisconnected', (event) => {
    });
    
    // Connect to the session
    this.session.connect(this.token, (error) => {
      if (!error) {
        // Create a publisher
        this.publisher = OT.initPublisher('publisher', {
          insertMode: 'append',
          resolution: '1280x720',
          width: '100%',
          height: '100%'  
          });
          
          this.session.publish(this.publisher, (error) => {
            if(error){
              console.log("Publisher error: " + error);
            }
          });
      } else {
        alert('There was an error connecting to the session' + error.message);
      }
    });
  }
  
// Ends call
endCall() {
  if (!!this.session) {
    this.session.disconnect();
  }
  //this.router.navigateByUrl('/tabs/tab1');
  //navigator['app'].exitApp(); 
  this.dismiss();
}

// Switch between cameras
toggleCamera() {
  this.cameraSource = this.cameraSource == 0 ? 1 : 0;
  this.session.unpublish(this.publisher);
  this.publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    resolution: '1280x720',
    width: '100%',
    height: '100%',
    videoSource: this.devices[this.cameraSource].deviceId
  });
  this.session.publish(this.publisher);
}

dismiss() {
  this.modalController.dismiss();
}


comprobarPermisos(){

  //Permiso de la cámara
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
  );
  
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

  //Permiso del micrófono
  this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
    result => console.log('Has permission?',result.hasPermission),
    err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
  );
  
  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
  
  //EMPEZAMOS LA LLAMADA
  this.startCall();
}

}
