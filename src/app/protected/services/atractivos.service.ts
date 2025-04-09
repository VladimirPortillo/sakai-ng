import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Atractivos_turisticos, ResponseCreateAtractivo, ResponseEditarAtractivo } from '../interfaces/atractivos';

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
  agregarAtractivosCompleto(atractivo:Atractivos_turisticos, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();
    
    formData.append('nombre', atractivo.nombre + '');
    formData.append('descripcion', atractivo.descripcion + '');
    formData.append('direccion', atractivo.direccion + '');
    formData.append('longitud', atractivo.longitud + '');
    formData.append('latitud', atractivo.latitud + '');
    formData.append('estado', atractivo.estado + '');
    formData.append('id_comunidad', atractivo.id_comunidad + '');

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.post<ResponseCreateAtractivo>('http://localhost:3000/api/createAtractivo',formData);
  }
  editarAtractivoCompleto(atractivo:Atractivos_turisticos, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('data', JSON.stringify(atractivo));

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.put<ResponseEditarAtractivo>(
        `http://localhost:3000/api/updateAtractivo/${atractivo.id_atractivo}`,formData
    );
  }
  editarAtractivo(Atractivo:Atractivos_turisticos, id_atractivo: any){
    return this.http.put<Atractivos_turisticos[]>(
        `http://localhost:3000/api/updateAtractivo/${id_atractivo}`,
        Atractivo
    );
  }
  verAtractivo(id_atractivo:number){
    return this.http.get<any>('http://localhost:3000/api/verAtractivo/'+id_atractivo);
  }
  eliminarAtractivo(id_atractivo:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteAtractivo/'+id_atractivo);
  }
  habilitarAtractivo(id_atractivo:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarAtractivo/'+id_atractivo);
  }
}
