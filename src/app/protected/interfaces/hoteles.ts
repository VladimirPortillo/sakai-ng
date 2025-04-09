import { Multimedia } from "./comunidades";

export interface Hoteles{
    id_hotel?:number;
    nombre:string | null;
    descripcion:string | null;
    direccion:string | null;
    estrellas:string | null;
    garaje:string | null;
    alimentacion:number | null;
    telefono:number | null;
    aire_acondicionado:string | null;
    longitud:number | null;
    latitud:number | null;
    estado:number | null;
    id_comunidad:number | null;
    multimedias:Multimedia[] | [];
}
export interface ResponseCreateHotel {
    ok:   boolean;
    msg:  string;
    data: any;
}

export interface ResponseEditarHotel {
    ok:               boolean;
    msg:              string;
    data:             any;
    deleteMultimedia: any;
    createMultimedia: any;
}