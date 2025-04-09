import { Multimedia } from "./comunidades";

export interface Restaurantes{
    id_restaurante?:number;
    nombre:string | null;
    descripcion:string | null;
    direccion:string | null;
    categoria:string | null;
    telefono:number | null;
    delivery:string | null;
    longitud:number | null;
    latitud:number | null;
    estado:number | null;
    id_comunidad:number | null;
    multimedias:  Multimedia[] | [];
}
// export interface Multimedia {
//     ruta:         string;
//     tipo_archivo: string;
// }


export interface ResponseCreateRestaurante {
    ok:   boolean;
    msg:  string;
    data: any;
}
export interface ResponseEditarRestaurante {
    ok:               boolean;
    msg:              string;
    data:             any;
    deleteMultimedia: any;
    createMultimedia: any;
}