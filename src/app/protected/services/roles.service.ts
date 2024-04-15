import { Injectable } from '@angular/core';
import { Roles } from '../interfaces/roles';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class RolesService {
    constructor(private http: HttpClient) {}
    getRoles() {
        return this.http.get<Roles[]>('http://localhost:3000/api/roles');
    }
    agregarRol(rol: Roles) {
        return this.http.post<Roles[]>(
            'http://localhost:3000/api/createRol',
            rol
        );
    }
    editarRol(rol:Roles, id_rol: any){
        return this.http.put<Roles[]>(
            `http://localhost:3000/api/updateRol/${id_rol}`,
            rol
        );
      }
    verRol(id_rol: number) {
        return this.http.get<any>('http://localhost:3000/api/verRol/' + id_rol);
    }
    eliminarRol(id_rol: any) {
        return this.http.delete<any>(
            'http://localhost:3000/api/deleteRol/' + id_rol
        );
    }
    habilitarRol(id_rol: any) {
        return this.http.get<any>(
            'http://localhost:3000/api/habilitarRol/' + id_rol
        );
    }
}
