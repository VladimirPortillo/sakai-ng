import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividades } from '../interfaces/actividades';

@Injectable({
    providedIn: 'root',
})
export class ActividadesService {
    constructor(private http: HttpClient) { }
    getActividades() {
        return this.http.get<Actividades[]>('http://localhost:3000/api/actividades');
    }
    verActividad(id_actividad: number) {
        return this.http.get<any>('http://localhost:3000/api/verActividad/' + id_actividad);
    }
    agregarActividad(actividad: Actividades) {
        return this.http.post<Actividades[]>('http://localhost:3000/api/createActividad', actividad);
    }
    editarActividad(actividad: Actividades, id_actividad: any) {
        return this.http.put<Actividades[]>(
            `http://localhost:3000/api/updateActividad/${id_actividad}`,actividad);
    }

    eliminarActividad(id_actividad: any) {
        return this.http.delete<any>('http://localhost:3000/api/deleteActividad/' + id_actividad);
    }
    habilitarActividad(id_actividad: any) {
        return this.http.get<any>('http://localhost:3000/api/habilitarActividad/' + id_actividad);
    }
}
