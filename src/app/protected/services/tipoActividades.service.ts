import { Injectable } from '@angular/core';
import { TipoActividades} from '../interfaces/tipoActividades';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class tipoActividadesService {
    constructor(private http: HttpClient) {}
    getTipoActividades() {
        return this.http.get<TipoActividades[]>('http://localhost:3000/api/tipoActividades');
    }
    agregarTipoActividad(tipoAcividad: TipoActividades) {
        return this.http.post<TipoActividades[]>(
            'http://localhost:3000/api/createTipoActividad',
            tipoAcividad
        );
    }
    editarTipoActividad(tipoAcividad:TipoActividades, id_tipo: any){
        return this.http.put<TipoActividades[]>(
            `http://localhost:3000/api/updateTipoActividad/${id_tipo}`,
            tipoAcividad
        );
      }
    verTipoActividad(id_tipo: number) {
        return this.http.get<any>('http://localhost:3000/api/verTipoActividad/' + id_tipo);
    }
    eliminarTipoActividad(id_tipo: any) {
        return this.http.delete<any>(
            'http://localhost:3000/api/deleteTipoActividad/' + id_tipo
        );
    }
    habilitarTipoActividad(id_tipo: any) {
        return this.http.get<any>(
            'http://localhost:3000/api/habilitarTipoActividad/' + id_tipo
        );
    }
}
