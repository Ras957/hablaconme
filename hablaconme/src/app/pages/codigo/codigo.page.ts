import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SesionService } from 'src/app/servicios/sesion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/servicios/util.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-codigo',
  templateUrl: './codigo.page.html',
  styleUrls: ['./codigo.page.scss'],
})
export class CodigoPage implements OnInit {
  usuario;
  public codigo_form: FormGroup;
  codigo_introducido;
  respuesta;
  datos_login;

  constructor(private alertController: AlertController, 
    private sesion: SesionService, 
    private formBuilder: FormBuilder,
    private util: UtilService,
    private router: Router,
    private storage: Storage) { 

    this.codigo_form = this.formBuilder.group({
      codigo: ['', Validators.compose([
        Validators.required
      ])],
      privacidad: [undefined, Validators.required]
    });
   }

  ngOnInit() {
  }

 ionViewDidEnter(){
  this.usuario = this.sesion.getUsuario();
  this.presentAlert();
  }

  async presentAlert(){
    const alert = await this.alertController.create({
      cssClass:'alert',
      message: 'Te hemos reenviado el mensaje a '+ this.usuario,

    });
    await alert.present();
    setTimeout(()=>{alert.dismiss();}, 3000);
  }

  comprobarCodigo(){
    this.codigo_introducido = this.codigo_form.get("codigo").value;
    if(this.codigo_introducido.length == 3){
      this.util.mostrarCargando();
      var json={email:this.usuario, codigo: this.codigo_introducido};
      this.util.consultaPOSTsinToken("login/codigo", json)    
      .then(data =>{
        this.respuesta = data;
          this.storage.set('usuario_primer_login', 'true' );
          var json2={email:this.usuario, password: this.codigo_introducido};
          this.util.consultaPOSTsinToken("login", json2)    
          .then( (data) =>{
            this.datos_login = data;
            this.storage.set('usuario_token', this.datos_login.token );
            this.sesion.guardarToken(this.datos_login.token);
            this.util.quitarCargando();
            this.router.navigateByUrl('/primera-sesion');   
          }).catch(data =>{
            this.util.quitarCargando();
              this.util.presentarToast("Oops.. parece que algo no ha ido bien");
          });
             
      }).catch(data =>{
        this.util.quitarCargando();
          this.util.presentarToast("Oops.. parece que algo no ha ido bien");
      });


    }
  }





}
