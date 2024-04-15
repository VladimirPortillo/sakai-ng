import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comunidades } from '../interfaces/comunidades';

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
  editarComunidad(Comunidad:Comunidades, id_comunidad: any){
    return this.http.put<Comunidades[]>(
        `http://localhost:3000/api/updateComunidad/${id_comunidad}`,
        Comunidad
    );
  }
  verComunidad(id_comunidad:number){
    return this.http.get<any>('http://localhost:3000/api/verComunidad/'+id_comunidad);
  }
  eliminarComunidad(id_comunidad:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteComunidad/'+id_comunidad);
  }
  habilitarComunidad(id_comunidad:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarComunidad/'+id_comunidad);
  }
}
