import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  getUsuarios(){
    return this.http.get<Usuarios[]>('http://localhost:3000/api/usuarios')
  }
  editarUsuario(Usuario:Usuarios, id_usuario: any){
    return this.http.put<Usuarios[]>(
        `http://localhost:3000/api/updateUsuario/${id_usuario}`,
        Usuario
    );
  }
  agregarUsuario(Usuario:Usuarios){
    return this.http.post<Usuarios[]>('http://localhost:3000/api/createUsuario',Usuario);
  }
  verUsuario(id_usuario:number){
    return this.http.get<any>('http://localhost:3000/api/verUsuario/'+id_usuario);
  }
  eliminarUsuario(id_usuario:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteUsuario/'+id_usuario);
  }
  habilitarUsuario(id_usuario:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarUsuario/'+id_usuario);
  }
}
