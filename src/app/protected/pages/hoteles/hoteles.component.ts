import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Hoteles } from '../../interfaces/hoteles';
import { HotelesService } from '../../services/hoteles.service';
import { ComunidadesService } from '../../services/comunidades.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
    selector: 'app-hoteles',
    templateUrl: './hoteles.component.html',
    styleUrls: ['./hoteles.component.scss']
})
export class HotelesComponent {
    hoteles: Hoteles[] = [];
    currentRowNumber: number = 0;

    modalHotelVisible: boolean = false;
    dataHotel: Hoteles = {
        nombre: null,
        descripcion: null,
        direccion: null,
        tipo: null,
        categoria: null,
        num_habitaciones: null,
        telefono: null,
        foto: null,
        longitud: null,
        latitud: null,
        estado: null,
        id_comunidad: null,
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Hotel';
    titleButton: String = 'Agregar';

    constructor(
        private hotelesService: HotelesService,
        private comunidadesService: ComunidadesService,
        private srvImprimir: ReportesService,
    ) { }

    ngOnInit(): void {
        this.getHoteles();
    }

    getHoteles() {
        this.hotelesService.getHoteles().subscribe((hoteles) => {
            this.hoteles = hoteles;
        });
    }

    modalHotel(
        hotel: any,
        tipoAccion: number,
        modalTitle: string,
        titleButton: string
    ) {
        this.modalHotelVisible = true;
        if (hotel == null) {
            this.dataHotel = {
                nombre: null,
                descripcion: null,
                direccion: null,
                tipo: null,
                categoria: null,
                num_habitaciones: null,
                telefono: null,
                foto: null,
                longitud: null,
                latitud: null,
                estado: null,
                id_comunidad: null,
            };
        } else {
            this.dataHotel = hotel;
        }
        this.tipoAccion = tipoAccion;
        this.modalTitle = modalTitle;
        this.titleButton = titleButton;
    }

    cerrarModal(value: boolean) {
        this.modalHotelVisible = value;
    }

    datosGuardadosModal(value: boolean) {
        this.modalHotelVisible = value;
        this.getHoteles();
    }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    onImprimir() {
        const encabezado = ["Nombre"];
        // this.rolesService.getRoles().subscribe((roles) => {
        //     this.roles = roles;
        //     //const cuerpo = roles.map(rol => Object.values(rol));
        //     const cuerpo=roles.map(rol => Object.values([rol.nombre]));
        //     console.log(cuerpo);
        //     this.srvImprimir.imprimir(encabezado,cuerpo,"Lista Roles",true);
        // });
    }
}
