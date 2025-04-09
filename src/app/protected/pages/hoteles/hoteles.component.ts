import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Hoteles } from '../../interfaces/hoteles';
import { HotelesService } from '../../services/hoteles.service';
import { ComunidadesService } from '../../services/comunidades.service';
import { ReportesService } from '../../services/reportes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-hoteles',
    templateUrl: './hoteles.component.html',
    styleUrls: ['./hoteles.component.scss']
})
export class HotelesComponent {
    hoteles: Hoteles[] = [];
    currentRowNumber: number = 0;
    loading:boolean=true;

    modalHotelVisible: boolean = false;
    dataHotel: Hoteles = {
        nombre: null,
        descripcion: null,
        direccion: null,
        estrellas: null,
        telefono: null,
        garaje: null,
        alimentacion: null,
        aire_acondicionado: null,
        longitud: null,
        latitud: null,
        estado: null,
        id_comunidad: null,
        multimedias:[],
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Hotel';
    titleButton: String = 'Agregar';

    constructor(
        private hotelesService: HotelesService,
        private comunidadesService: ComunidadesService,
        private srvImprimir: ReportesService,
        private router:Router
    ) { }

    ngOnInit(): void {
        this.getHoteles();
    }

    getHoteles() {
        this.hotelesService.getHoteles().subscribe((hoteles) => {
            this.hoteles = hoteles;
        });
        this.loading=false;
    }
    agregarHotel() {
        console.log("entra agregar");        
        this.router.navigate(['/index/hoteles/agregar']);
    }
    editarHotel(id_hotel:number) {
        console.log("entra editar"); 
        console.log("entra editar", id_hotel);       
        this.router.navigate(['/index/hoteles/editar',id_hotel]);
    }
    verHotel(id_hotel:number) {
        console.log("entra ver"); 
        console.log("entra ver", id_hotel);       
        this.router.navigate(['/index/hoteles/ver',id_hotel]);
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
                estrellas: null,
                telefono: null,
                garaje: null,
                alimentacion: null,
                aire_acondicionado: null,
                longitud: null,
                latitud: null,
                estado: null,
                id_comunidad: null,
                multimedias:[]
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
