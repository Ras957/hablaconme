import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, EmailValidator } from '@angular/forms';
import { UtilService } from 'src/app/servicios/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reestablecer-contraseya',
  templateUrl: './reestablecer-contraseya.page.html',
  styleUrls: ['./reestablecer-contraseya.page.scss'],
})
export class ReestablecerContraseyaPage implements OnInit {
  public email_magico: FormGroup;
  public email_contraseya: FormGroup;

  constructor(private alertController: AlertController,  
    private formBuilder: FormBuilder,
    private util: UtilService,
    private router: Router) { 

    this.email_magico = this.formBuilder.group({
      email_magic: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });

    this.email_contraseya = this.formBuilder.group({
      email_contra: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]
    });
  }

  ngOnInit() {
  }

  async presentAlert_Magico() {
    const alert = await this.alertController.create({
      cssClass:'alert',
      message: '¡Mira tu correo!, te hemos enviado un enlace para acceder a tu cuenta.',

    });
    await alert.present();
    setTimeout(()=>{alert.dismiss();}, 3000);
  }

  async presentAlert_Contraseya() {
    const alert = await this.alertController.create({
      cssClass:'alert',
      message: '¡Mira tu correo!, te hemos enviado una nueva contraseña. :)',

    });
    await alert.present();
    setTimeout(()=>{alert.dismiss();}, 3000);
  }

  restablecerContrasenya(){
    var email_api= this.email_contraseya.get("email_contra").value;
    var json={email:email_api};
    this.util.consultaPOST("login/olvide-contrasenya", json)    
    .then( (data) =>{
      this.presentAlert_Contraseya();
        this.router.navigateByUrl('/');
    });
    
  }

}
