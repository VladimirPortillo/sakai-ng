export interface Comunidades{
    id_comunidad?:number;
    nombre:string | null;
    descripcion:string | null;
    superficie:number | null;
    poblacion:number | null;
    longitud:number | null;
    latitud:number | null;
    estado:number | null;
    id_usuario:number | null;
    multimedias:  Multimedia[] | [];
}

export interface Multimedia {
    id_multimedia?:number;
    ruta:         string;
    tipo_archivo: string;
    eliminar: boolean  | false;
}


export interface ResponseCreateComunidad {
    ok:   boolean;
    msg:  string;
    data: any;
}

export interface ResponseEditarComunidad {
    ok:               boolean;
    msg:              string;
    data:             any;
    deleteMultimedia: any;
    createMultimedia: any;
}