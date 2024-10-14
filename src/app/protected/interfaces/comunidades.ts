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
    multimedias?:  Multimedia[];
}

export interface Multimedia {
    ruta:         string;
    tipo_archivo: string;
}