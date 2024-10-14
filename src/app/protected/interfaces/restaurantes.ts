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
}