import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfReportService {

  constructor(private http:HttpClient) { }
  getComunidadActividades(id_comunidad:number,fecha_inic:string,fecha_fin:string){
    const params = new HttpParams()
    .set('id_comunidad', id_comunidad)
    .set('fecha_inic', fecha_inic)
    .set('fecha_fin', fecha_fin);


    return this.http.get<any>('http://localhost:3000/api/comunidadActividades', { params });
  }
}
