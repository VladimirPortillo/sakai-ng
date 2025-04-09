import { Multimedia } from "./comunidades";

export interface Atractivos_turisticos{
    id_atractivo?:number;
    nombre:string | null;
    descripcion:string | null;
    direccion:string | null;
    longitud:number | null;
    latitud:number | null;
    estado:number | null;
    id_comunidad:number | null;
    multimedias: Multimedia[] | [];
}
export interface ResponseCreateAtractivo {
    ok:   boolean;
    msg:  string;
    data: any;
}
export interface ResponseEditarAtractivo {
    ok:               boolean;
    msg:              string;
    data:             any;
    deleteMultimedia: any;
    createMultimedia: any;
}