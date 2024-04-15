import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Actividades } from '../../interfaces/actividades';
import { ActividadesService } from '../../services/actividades.service';

@Component({
    selector: 'app-actividades',
    templateUrl: './actividades.component.html',
    styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent {
    actividades: Actividades[] = [];

    modalActividadVisible: boolean = false;
    dataActividad: Actividades = {
        nombre: null,
        descripcion: null,
        direccion: null,
        fecha_inicio: null,
        fecha_fin: null,
        longitud: null,
        latitud: null,
        estado: null,
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Actividad';
    titleButton: String = 'Agregar';

    constructor(
        private actividadesService: ActividadesService
    ) {}

    ngOnInit(): void {
        this.getActividades();
    }
    
    getActividades() {
        this.actividadesService.getActividades().subscribe((actividades) => {
            this.actividades = actividades;
        });
    }

    modalActividad(
        actividad: any,
        tipoAccion: number,
        modalTitle: string,
        titleButton: string
    ) {
        this.modalActividadVisible = true;
        if (actividad == null) {
            this.dataActividad = {
                nombre: null,
                descripcion: null,
                direccion: null,
                fecha_inicio: null,
                fecha_fin: null,
                longitud: null,
                latitud: null,
                estado: null,
            };
        } else {
            this.dataActividad = actividad;
        }
        this.tipoAccion = tipoAccion;
        this.modalTitle = modalTitle;
        this.titleButton = titleButton;
    }

    cerrarModal(value: boolean) {
        this.modalActividadVisible = value;
    }
    
    datosGuardadosModal(value: boolean) {
        this.modalActividadVisible = value;
        this.getActividades();
    }
      // buscar por filtro
      onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
