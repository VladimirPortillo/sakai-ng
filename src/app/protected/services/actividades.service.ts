import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividades, ResponseCreateActividad, ResponseEditarActividad} from '../interfaces/actividades';

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
    agregarActividadCompleto(actividad:Actividades, files: File[]){
        // Creamos un objeto FormData para enviar los datos
        const formData = new FormData();

        // agregamos los datos de comunidad 
        formData.append('nombre', actividad.nombre + '');
        formData.append('descripcion', actividad.descripcion + '');
        formData.append('direccion', actividad.direccion + '');
        formData.append('fecha_inicio', this.transformarFecha(actividad.fecha_inicio) + '');
        formData.append('fecha_fin', this.transformarFecha(actividad.fecha_fin) + '');
        formData.append('id_comunidad', actividad.id_comunidad + '');
        formData.append('id_tipo', actividad.id_tipo + '');
        formData.append('longitud', actividad.longitud + '');
        formData.append('latitud', actividad.latitud + '');
        formData.append('estado', actividad.estado + '');
    
        // agregamos los archivos o imagenes
        files.forEach((file, index) => {
          formData.append('image', file, file.name);
        });
    
        return this.http.post<ResponseCreateActividad>('http://localhost:3000/api/createActividad',formData);
      }
      editarActividadCompleto(actividad:Actividades, files: File[]){
        // Creamos un objeto FormData para enviar los datos
        const formData = new FormData();
    
        // agregamos los datos de comunidad 
        formData.append('data', JSON.stringify(actividad));
    
        // agregamos los archivos o imagenes
        files.forEach((file, index) => {
          formData.append('image', file, file.name);
        });
    
        return this.http.put<ResponseEditarActividad>(
            `http://localhost:3000/api/updateActividad/${actividad.id_actividad}`,formData
        );
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

    transformarFecha(fecha: Date | null): string {
        // Convertir la cadena de fecha a un objeto Date
        //const fecha = new Date(fechaString);

        if(fecha === null) {
            return ""
        }
      
        // Obtener el año, mes y día
        const año = fecha.getFullYear();
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses van de 0 a 11, por lo que sumamos 1
        const dia = fecha.getDate().toString().padStart(2, '0');
      
        // Formatear la fecha en el formato año/mes/día
        return `${dia}-${mes}-${año}`;
    }

}
