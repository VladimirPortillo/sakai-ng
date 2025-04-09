import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseCreateRestaurante, ResponseEditarRestaurante, Restaurantes } from '../interfaces/restaurantes';

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
  agregarRestauranteCompleto(restaurante:Restaurantes, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('nombre', restaurante.nombre + '');
    formData.append('descripcion', restaurante.descripcion + '');
    formData.append('direccion', restaurante.direccion + '');
    formData.append('categoria', restaurante.categoria + '');
    formData.append('telefono', restaurante.telefono + '');
    formData.append('delivery', restaurante.delivery + '');
    formData.append('id_comunidad', restaurante.id_comunidad + '');
    formData.append('longitud', restaurante.longitud + '');
    formData.append('latitud', restaurante.latitud + '');
    formData.append('estado', restaurante.estado + '');
    

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.post<ResponseCreateRestaurante>('http://localhost:3000/api/createRestaurante',formData);
  }
  editarRestauranteCompleto(restaurante:Restaurantes, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('data', JSON.stringify(restaurante));

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.put<ResponseEditarRestaurante>(
        `http://localhost:3000/api/updateRestaurante/${restaurante.id_restaurante}`,formData
    );
  }
  editarRestaurante(Restaurante:Restaurantes, id_restaurante: any){
    return this.http.put<Restaurantes[]>(
        `http://localhost:3000/api/updateRestaurante/${id_restaurante}`,
        Restaurante
    );
  }
  verRestaurante(id_restaurante:number){
    return this.http.get<any>('http://localhost:3000/api/verRestaurante/'+id_restaurante);
  }
  eliminarRestaurante(id_restaurante:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteRestaurante/'+id_restaurante);
  }
  habilitarRestaurante(id_restaurante:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarRestaurante/'+id_restaurante);
  }
}
