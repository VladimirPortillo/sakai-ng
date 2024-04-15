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
}
