import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividades } from '../interfaces/actividades';

@Injectable({
    providedIn: 'root',
})
export class ActividadesService {
    constructor(private http: HttpClient) {}
    getActividades() {
        return this.http.get<Actividades[]>(
            'http://localhost:3000/api/actividades'
        );
    }
}
