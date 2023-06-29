import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hoteles } from '../interfaces/hoteles';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  constructor(private http:HttpClient) { }
  getHoteles(){
    return this.http.get<Hoteles[]>('http://localhost:3000/api/hoteles')
  }
  agregarHotel(hotel:Hoteles){
    return this.http.post<Hoteles[]>('http://localhost:3000/api/createHotel',hotel);
  }
  verHotel(id_hotel:number){
    return this.http.get<any>('http://localhost:3000/api/verHotel/'+id_hotel);
  }
  eliminarHotel(id_hotel:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteHotel/'+id_hotel);
  }
  habilitarHotel(id_hotel:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarHotel/'+id_hotel);
  }
}
