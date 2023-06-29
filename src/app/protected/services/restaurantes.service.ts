import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurantes } from '../interfaces/restaurantes';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private http:HttpClient) { }
  getRestaurantes(){
    return this.http.get<Restaurantes[]>('http://localhost:3000/api/restaurantes')
  }
  agregarRestaurante(restaurante:Restaurantes){
    return this.http.post<Restaurantes[]>('http://localhost:3000/api/createRestaurante',restaurante);
  }
  verRestaurante(id_restaurante:number){
    return this.http.get<any>('http://localhost:3000/api/verRestaurante/'+id_restaurante);
  }
  eliminarRestaurante(id_restaurante:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteRestaurante/'+id_restaurante);
  }
  habilitarRestaurante(id_restaurante:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarRestaurante/'+id_restaurante);
  }
}
