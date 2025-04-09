import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import { Table } from 'primeng/table';

import { Actividades } from '../../interfaces/actividades';
import { ActividadesService } from '../../services/actividades.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
    selector: 'app-actividades',
    templateUrl: './actividades.component.html',
    styleUrls: ['./actividades.component.scss'],
    providers: [DatePipe,{provide:LOCALE_ID, useValue: 'es'}],
})

export class ActividadesComponent {
    formattedDate: string="";
    actividades: Actividades[] = [];
    currentRowNumber:number = 0;

    //loading: boolean = true;

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
        id_comunidad: null,
        id_tipo: null,
        multimedias:[]
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Actividad';
    titleButton: String = 'Agregar';

    constructor(
        private actividadesService: ActividadesService,
        private srvImprimir: ReportesService,
        private datePipe: DatePipe,
        private router:Router
    ) {}

    ngOnInit(): void {
        this.getActividades();
    }
    
    getActividades() {
        this.actividadesService.getActividades().subscribe((actividades) => {
            this.actividades = actividades;
            //this.loading = false
        });
    }
    agregarActividad() {
        this.router.navigate(['/index/actividades/agregar']);
    }
    editarActividad(id_actividad:number) {
        console.log("entra editar"); 
        console.log("entra editar", id_actividad);       
        this.router.navigate(['/index/actividades/editar',id_actividad]);
    }
    verActividad(id_actividad:number) {
        console.log("entra ver"); 
        console.log("entra ver", id_actividad);       
        this.router.navigate(['/index/actividades/ver',id_actividad]);
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
                id_comunidad: null,
                id_tipo: null,
                multimedias:[]
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
    
    onImprimir(){
        let rowNumber=0;
        const encabezado=["N°","Nombre","Descrición","Dirección","Fecha de inicio","Fecha de finalización"];
        this.actividadesService.getActividades().subscribe((actividades) => {
            this.actividades = actividades;
            const cuerpo= Object(this.actividades).map(
                
                (obj:any)=>{        
                    const datos=[
                        rowNumber += 1,
                        obj.nombre,
                        obj.descripcion,
                        obj.direccion,
                        this.datePipe.transform(obj.fecha_inicio, 'EEEE, dd MMMM yyyy'),
                        this.datePipe.transform(obj.fecha_fin, 'EEEE, dd MMMM yyyy')
                    ]
                    return datos;
                }
            )
            console.log(cuerpo);
            this.srvImprimir.imprimir(encabezado,cuerpo,"Lista actividades",true);
        });
    }
}
