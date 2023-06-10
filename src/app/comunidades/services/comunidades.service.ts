import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comunidades } from '../interfaces/comunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadesService {

  constructor(private http:HttpClient) { }
  getComunidades(){
    return this.http.get<Comunidades[]>('http://localhost:3000/api/comunidades')
  }
  agregarComunidad(comunidad:Comunidades){
    return this.http.post<Comunidades[]>('http://localhost:3000/api/createComunidad',comunidad);
  }
  verComunidad(id_comunidad:number){
    return this.http.get<any>('http://localhost:3000/api/verComunidad/'+id_comunidad);
  }
  eliminarComunidad(id_comunidad:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteComunidad/'+id_comunidad);
  }
  habilitarComunidad(id_comunidad:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarComunidad/'+id_comunidad);
  }
}
