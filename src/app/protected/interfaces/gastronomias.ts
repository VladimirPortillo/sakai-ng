import { Comunidades, Multimedia } from "./comunidades";

export interface Gastronomia{
    id_gastronomia?:number;
    nombre:string | null;
    descripcion:string | null;
    tipo:string | null;
    estado:number | null;
    ids_comunidad:number[] | [];
    delete_ids_comunidad:number[] | [];
    multimedias:Multimedia[] | [];
    comunidades:    Comunidades[] | [];
}

export interface ResponseCrearGastronomia {
    ok:                      boolean;
    msg:                     string;
    data:                    any;
    comunidades_gastronomia: any;
    multimedias:             any;
}
export interface ResponseEditarGastronomia {
    ok:               boolean;
    msg:              string;
    data:             any;
    deleteMultimedia: any;
    createMultimedia: any;
}