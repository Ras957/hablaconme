import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage} from '@ionic/storage';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {


  private  miSesion: SesionService = undefined;
  private token;
  private datosUsuario;
  private rol;
  private plan;
  

  constructor(private storage: Storage
    ) { }



  public obtenerToken(){
    return this.token;
  }

  public guardarToken(token){
    this.token = token;
  }

  public obtenerRol(){
    return this.rol;
  }

  public guardarRol(rol){
    this.rol = rol;
  }

  public crearSesion(){
    this.storage.get('usuario_token').then((val) => {
      this.token = val;
    });
  }

  public login(usuario){
    this.datosUsuario= usuario;
  }

  public getUsuario(){
    return this.datosUsuario;
  }

  public async getPlan(plan:any){
    await this.storage.get('plan').then((val) => {
      plan = val;
    })
  }
  

}
