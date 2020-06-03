import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/servicios/util.service';
import * as moment from 'moment';

import { Stripe } from '@ionic-native/stripe/ngx';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  @Input() inicial;
  @Input() datos_pago;
  public tarjeta_form: FormGroup;

  cardNumber;
  cardCvc;
  cardExpiry;
  pagando = false;

  tarjetaSeleccionado = true;
  paypalSeleccionado = false;
  card_expiry_errors;
  card_number_errors;
  albaranes_id;
  card_cvc_errors;
  dominio_seleccionado;

  informacion_de_pago;

  card: any;

  constructor(private modalController: ModalController,
    private alertController: AlertController,
    private statusBar: StatusBar,
    private util: UtilService,
    private formBuilder: FormBuilder,
    private stripe: Stripe,
    private payPal: PayPal) {

    this.stripe.setPublishableKey('pk_test_5itTHbaN1Nlh96cyqJvTX0du00VOIxGm4R');

    this.tarjeta_form = this.formBuilder.group({
      tarjeta_numero: ["", Validators.compose([
        Validators.maxLength(16),
        Validators.minLength(16),
        Validators.required
      ])],
      tarjeta_mm: ["", Validators.compose([
        Validators.maxLength(2),
        Validators.minLength(1),
        Validators.required
      ])],
      tarjeta_aa: ["", Validators.compose([
        Validators.maxLength(2),
        Validators.minLength(2),
        Validators.required
      ])],
      tarjeta_cvc: ["", Validators.compose([
        Validators.maxLength(3),
        Validators.minLength(3),
        Validators.required
      ])],
      tarjeta: [false],
      paypal: [false]
    });
    this.card_expiry_errors = '';
    this.card_number_errors = '';
    this.card_cvc_errors = '';
  }

  ngOnInit() {
    this.util.mostrarCargando();
    this.informacion_plan();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  ionViewDidEnter() {
    this.statusBar.overlaysWebView(false);
    this.statusBar.styleDefault();
    this.statusBar.backgroundColorByName("white");

  }

  informacion_plan(){
    this.util.consultaGET("plan/"+ this.datos_pago.nombre)
    .then((data) => {
      this.informacion_de_pago = data;
      this.informacion_de_pago = this.informacion_de_pago.plan;
      
      switch (this.datos_pago.modalidad) {
        case "mensual":
          this.datos_pago.precio = this.informacion_de_pago.precio_mensual;
        case "trimestral":
          this.datos_pago.precio = this.informacion_de_pago.precio_trimestral;
        case "anual":
          this.datos_pago.precio = this.informacion_de_pago.precio_anual;
        default:
          this.datos_pago.precio = this.informacion_de_pago.precio_anual;
          this.datos_pago.modalidad = "anual"
      }
      this.util.quitarCargando();
    });
  }

  async presentAlert_Pago_ok() {
    const alert = await this.alertController.create({
      header: 'Pago correcto',
      cssClass: 'alert_pago',
      message: 'El pago se ha efectuado correctamente.',
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
      this.dismiss();
    }, 3000);
  }

  async presentAlert_Pago_error() {
    const alert = await this.alertController.create({
      header: 'Pago incorrecto',
      cssClass: 'alert_pago_error',
      message: 'Algo ha ido mal en el proceso de pago. Vamos a intentarlo de nuevo.',
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
      this.dismiss();
    }, 3000);
  }

  crearLlamadaInicial() {
    this.util.consultaPOST("sesiones/", this.inicial)
      .then((data) => {
        this.util.presentAlert("La videollamada se reservó correctamente.");
        this.dismiss();
      }).catch((data) => {
        this.util.presentarToast("Oops.. parece que algo no ha ido bien");
      });
  }

  formaPagoTarjeta() {
    this.tarjetaSeleccionado = true;
    this.paypalSeleccionado = false;
    this.tarjeta_form.setValue({ paypal: false });
  }

  formaPagoPaypal() {
    this.tarjetaSeleccionado = false;
    this.paypalSeleccionado = true;
    this.tarjeta_form.setValue({ tarjeta: false });
  }



  realizarPago() {
    this.util.mostrarCargando();

    //PAGO CON TARJETA #####################################################################
    if (this.tarjetaSeleccionado){
    let tarjeta = this.tarjeta_form.get("tarjeta_numero").value;
    console.log("Datos de pago: ");
    console.log(this.datos_pago);
    let card = {
      number: this.tarjeta_form.get("tarjeta_numero").value,
      expMonth: this.tarjeta_form.get("tarjeta_mm").value,
      expYear: this.tarjeta_form.get("tarjeta_aa").value,
      cvc: this.tarjeta_form.get("tarjeta_cvc").value
    }
    this.stripe.createCardToken(card)
      .then((token) => {
        var json = { token: token.id, plan: this.datos_pago };
        this.util.consultaPOST("pago/tarjeta", json)
          .then((data) => {
            if (data == null) {
              this.dismiss();
              this.util.quitarCargando();
              this.presentAlert_Pago_ok();
            } else {
              this.util.quitarCargando();
              this.presentAlert_Pago_error();
            }
          });
      }).catch((error) => {
        this.util.quitarCargando();
        this.presentAlert_Pago_error();
      });
    
      //PAGO CON PAYPAL #########################################################################
    }else if(this.paypalSeleccionado){
      this.payPal.init({
        PayPalEnvironmentProduction: 'Ac8v5xPJ6gSoejsH9ZVvXUd7iK2fiwF0_ROffY-1Tj5-Z_-HsW8dz8r9B-ELQdGliRNOLpF21FslrtuO',
        PayPalEnvironmentSandbox: 'Ac8v5xPJ6gSoejsH9ZVvXUd7iK2fiwF0_ROffY-1Tj5-Z_-HsW8dz8r9B-ELQdGliRNOLpF21FslrtuO'
      }).then(() => {
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
          acceptCreditCards: false
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          let payment = new PayPalPayment( this.datos_pago.precio , 'EUR', this.datos_pago.nombre , 'sale');
          this.payPal.renderSinglePaymentUI(payment).then((respuesta) => {
              console.log("PAGO CORRECTO::::::: ");
              console.log(respuesta);
              this.dismiss();
              this.util.quitarCargando();
              this.presentAlert_Pago_ok();

          }, () => {
            // Error or render dialog closed without being successful
            console.log("PAGO ERROR 1");
          });
        }, () => {
          // Error in configuration
          console.log("PAGO ERROR 2");
        });
      }, () => {
        // Error in initialization, maybe PayPal isn't supported or something else
        console.log("PAGO ERROR 3");
      });


    }else{
      this.util.presentarToast("Error al abrir la página de pago");
    }
  }
}
