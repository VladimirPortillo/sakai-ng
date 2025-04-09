import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comunidades, ResponseCreateComunidad, ResponseEditarComunidad } from '../interfaces/comunidades';

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

  agregarComunidadCompleto(comunidad:Comunidades, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('nombre', comunidad.nombre + '');
    formData.append('descripcion', comunidad.descripcion + '');
    formData.append('superficie', comunidad.superficie + '');
    formData.append('poblacion', comunidad.poblacion + '');
    formData.append('longitud', comunidad.longitud + '');
    formData.append('latitud', comunidad.latitud + '');
    formData.append('estado', comunidad.estado + '');
    formData.append('id_usuario', comunidad.id_usuario + '');

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.post<ResponseCreateComunidad>('http://localhost:3000/api/createComunidad',formData);
  }

  editarComunidadCompleto(comunidad:Comunidades, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('data', JSON.stringify(comunidad));

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.put<ResponseEditarComunidad>(
        `http://localhost:3000/api/updateComunidad/${comunidad.id_comunidad}`,formData
    );
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
