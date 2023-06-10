import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  getUsuarios(){
    return this.http.get<Usuarios[]>('http://localhost:3000/api/usuarios')
  }
  agregarUsuario(Usuario:Usuarios){
    return this.http.post<Usuarios[]>('http://localhost:3000/api/createUsuario',Usuario);
  }
  verUsuario(id_usuario:number){
    return this.http.get<any>('http://localhost:3000/api/verUsuario/'+id_usuario);
  }
  eliminarUsuario(id_usuario:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteUsuario/'+id_usuario);
  }
  habilitarUsuario(id_usuario:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarUsuario/'+id_usuario);
  }
}
