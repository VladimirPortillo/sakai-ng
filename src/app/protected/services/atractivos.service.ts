import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atractivos_turisticos } from '../interfaces/atractivos';

@Injectable({
  providedIn: 'root'
})
export class AtractivosService {

  constructor(private http:HttpClient) { }
  getAtractivos(){
    return this.http.get<Atractivos_turisticos[]>('http://localhost:3000/api/atractivos')
  }
  agregarAtractivo(atractivo:Atractivos_turisticos){
    return this.http.post<Atractivos_turisticos[]>('http://localhost:3000/api/createAtractivo',atractivo);
  }
  verAtractivo(id_atractivo:number){
    return this.http.get<any>('http://localhost:3000/api/verAtractivo/'+id_atractivo);
  }
  eliminarAtractivo(id_atractivo:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteAtractivo/'+id_atractivo);
  }
  habilitarAtractivo(id_atractivo:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarAtractivo/'+id_atractivo);
  }
}
