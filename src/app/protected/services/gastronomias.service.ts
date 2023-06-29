import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gastronomia } from '../interfaces/gastronomias';

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
  verGastronomia(id_gastronomia:number){
    return this.http.get<any>('http://localhost:3000/api/verGastronomia/'+id_gastronomia);
  }
  eliminarGastronomia(id_gastronomia:number){
    return this.http.delete<any>('http://localhost:3000/api/deleteGastronomia/'+id_gastronomia);
  }
  habilitarGastronomia(id_gastronomia:number){
    return this.http.get<any>('http://localhost:3000/api/habilitarGastronomia/'+id_gastronomia);
  }
}
