import { Multimedia } from "./comunidades";

export interface Actividades {
    id_actividad?: number;
    nombre: string | null;
    descripcion: string | null;
    direccion: string | null;
    fecha_inicio: Date | null;
    fecha_fin: Date | null;
    longitud: number | null;
    latitud: number | null;
    estado: number | null;
    id_comunidad:number | null;
    id_tipo: number | null;
    multimedias:  Multimedia[] | [];
}
/* export interface Multimedia {
    ruta:         string;
    tipo_archivo: string;
}
 */

export interface ResponseCreateActividad {
    ok:   boolean;
    msg:  string;
    data: any;
}
export interface ResponseEditarActividad {
    ok:               boolean;
    msg:              string;
    data:             any;
    deleteMultimedia: any;
    createMultimedia: any;
}