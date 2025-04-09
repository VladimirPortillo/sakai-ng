import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hoteles, ResponseCreateHotel, ResponseEditarHotel } from '../interfaces/hoteles';

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
  agregarHotelCompleto(hotel:Hoteles, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('nombre', hotel.nombre + '');
    formData.append('descripcion', hotel.descripcion + '');
    formData.append('direccion', hotel.direccion + '');
    formData.append('estrellas', hotel.estrellas + '');
    formData.append('telefono', hotel.telefono + '');
    formData.append('garaje', hotel.garaje + '');
    formData.append('alimentacion', hotel.alimentacion + '');
    formData.append('aire_acondicionado', hotel.aire_acondicionado + '');
    formData.append('longitud', hotel.longitud + '');
    formData.append('latitud', hotel.latitud + '');
    formData.append('estado', hotel.estado + '');
    formData.append('id_comunidad', hotel.id_comunidad + '');

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.post<ResponseCreateHotel>('http://localhost:3000/api/createHotel',formData);
  }
  editarHotelCompleto(hotel:Hoteles, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('data', JSON.stringify(hotel));

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.put<ResponseEditarHotel>(
        `http://localhost:3000/api/updateHotel/${hotel.id_hotel}`,formData
    );
  }
  editarRestaurante(Hotel:Hoteles, id_hotel: any){
    return this.http.put<Hoteles[]>(
        `http://localhost:3000/api/updateHotel/${id_hotel}`,
        Hotel
    );
  }
  verHotel(id_hotel:number){
    return this.http.get<any>('http://localhost:3000/api/verHotel/'+id_hotel);
  }
  eliminarHotel(id_hotel:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteHotel/'+id_hotel);
  }
  habilitarHotel(id_hotel:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarHotel/'+id_hotel);
  }
}
