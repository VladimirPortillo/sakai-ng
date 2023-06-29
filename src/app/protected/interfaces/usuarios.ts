export interface Usuarios{
    id_usuario?:number;
    nombre:string | null;
    ap:string | null;
    am:string | null;
    ci:number | null;
    fecha_nac:Date| null;
    usuario:string | null;
    contrasena:string | null;
    estado:number | null;
    id_rol:number | null;
}