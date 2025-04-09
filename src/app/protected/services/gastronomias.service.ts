import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gastronomia, ResponseCrearGastronomia, ResponseEditarGastronomia } from '../interfaces/gastronomias';

@Injectable({
  providedIn: 'root'
})
export class GastronomiasService {
  constructor(private http:HttpClient) { }
  getGastronomias(){
    return this.http.get<Gastronomia[]>('http://localhost:3000/api/gastronomias')
  }
  agregarGastronomia(gastronomia:Gastronomia){
    return this.http.post<Gastronomia[]>('http://localhost:3000/api/createGastronomia',gastronomia);
  }

  agregarGastronomiaCompleto(gastronomia:Gastronomia, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('nombre', gastronomia.nombre + '');
    formData.append('descripcion', gastronomia.descripcion + '');
    formData.append('tipo', gastronomia.tipo + '');
    formData.append('estado', gastronomia.estado + '');
    formData.append('ids_comunidad', JSON.stringify(gastronomia.ids_comunidad));

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.post<ResponseCrearGastronomia>('http://localhost:3000/api/createGastronomia',formData);
  }
  editarGastronomiaCompleto(gastronomia:Gastronomia, files: File[]){
    // Creamos un objeto FormData para enviar los datos
    const formData = new FormData();

    // agregamos los datos de comunidad 
    formData.append('data', JSON.stringify(gastronomia));

    // agregamos los archivos o imagenes
    files.forEach((file, index) => {
      formData.append('image', file, file.name);
    });

    return this.http.put<ResponseEditarGastronomia>(
        `http://localhost:3000/api/updateGastronomia/${gastronomia.id_gastronomia}`,formData
    );
  }
  
  editarGastronomia(gastronomia:Gastronomia, id_gastronomia: any){
    return this.http.put<Gastronomia[]>(
        `http://localhost:3000/api/updateGastronomia/${id_gastronomia}`,
        gastronomia
    );
  }
  verGastronomia(id_gastronomia:number){
    return this.http.get<any>('http://localhost:3000/api/verGastronomia/'+id_gastronomia);
  }
  eliminarGastronomia(id_gastronomia:any){
    return this.http.delete<any>('http://localhost:3000/api/deleteGastronomia/'+id_gastronomia);
  }
  habilitarGastronomia(id_gastronomia:any){
    return this.http.get<any>('http://localhost:3000/api/habilitarGastronomia/'+id_gastronomia);
  }
}
