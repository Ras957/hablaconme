import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrivacidadPage } from './modals/privacidad/privacidad.page';
import { PagoPage } from './modals/pago/pago.page';

import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AvatarPage } from './modals/avatar/avatar.page'
import { LlamadaPage } from './modals/llamada/llamada.page';
import { ModificarFechaPage } from './modals/modificar-fecha/modificar-fecha.page';
import { BorrarDatosConfirmacionPage } from './modals/borrar-datos-confirmacion/borrar-datos-confirmacion.page';
import { AyadirEditarMetasPage } from './modals/ayadir-editar-metas/ayadir-editar-metas.page';
import { MetasPage } from './modals/metas/metas.page';
import { ImagenMetasPage } from './modals/imagen-metas/imagen-metas.page';

import { IonicStorageModule } from '@ionic/storage';
import { KeysPipe } from './servicios/keys.pipe';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { File } from '@ionic-native/file/ngx';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MensajeAdminPage } from './modals/mensaje-admin/mensaje-admin.page';
import { Action } from 'rxjs/internal/scheduler/Action';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { EntrarVideollamadaPage } from './pages/entrar-videollamada/entrar-videollamada.page';
//import * as ActionCable from 'actioncable'
//const ActionCable = require('actioncable');
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';
// Firebase
import { firebaseConfig, environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';




export function setTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent,PrivacidadPage, PagoPage, AvatarPage, LlamadaPage, ModificarFechaPage, 
    BorrarDatosConfirmacionPage,AyadirEditarMetasPage,MetasPage,ImagenMetasPage, MensajeAdminPage,
    EntrarVideollamadaPage
   ],
  entryComponents: [PrivacidadPage, PagoPage, AvatarPage,LlamadaPage,ModificarFechaPage, 
    BorrarDatosConfirmacionPage, AyadirEditarMetasPage,MetasPage, ImagenMetasPage, MensajeAdminPage, EntrarVideollamadaPage],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory:(setTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //Storage,
    ImagePicker,
    WebView,
    File,
    LocalNotifications,
    AndroidPermissions,
    Stripe,
    PayPal,
    GooglePlus,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
