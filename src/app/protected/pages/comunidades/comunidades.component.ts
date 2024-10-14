import { Component } from '@angular/core';
import { Table } from 'primeng/table';

import { Comunidades } from '../../interfaces/comunidades';
import { ComunidadesService } from '../../services/comunidades.service';
import { ReportesService } from '../../services/reportes.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comunidades',
    templateUrl: './comunidades.component.html',
    styleUrls: ['./comunidades.component.scss']
})
export class ComunidadesComponent {
    comunidades: Comunidades[] = [];
    currentRowNumber: number = 0;
    modalComunidadVisible: boolean = false;
    dataComunidad: Comunidades = {
        nombre: null,
        descripcion: null,
        superficie: null,
        poblacion: null,
        longitud: null,
        latitud: null,
        estado: null,
        id_usuario: null,
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Comunidad';
    titleButton: String = 'Agregar';

    constructor(
        private comunidadesService: ComunidadesService,
        private srvImprimir: ReportesService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getComunidades();
    }

    getComunidades() {
        this.comunidadesService.getComunidades().subscribe((comunidades) => {
            this.comunidades = comunidades;
        });
    }

    agregarComunidad() {
        console.log("entra agregar");        
        this.router.navigate(['/index/comunidades/agregar']);
    }


    modalComunidad(
        comunidad: any,
        tipoAccion: number,
        modalTitle: string,
        titleButton: string
    ) {
        //this.modalComunidadVisible = true;
        if (comunidad == null) {
            this.dataComunidad = {
                nombre: null,
                descripcion: null,
                superficie: null,
                poblacion: null,
                longitud: null,
                latitud: null,
                estado: null,
                id_usuario: null,
            };
            this.modalComunidadVisible = true;
        } else {
            // 1 peticion a vercomuidad co comunidad.id_comunidad
            // 2 this.dataComunidad = resp.data;
            this.comunidadesService.verComunidad(comunidad.id_comunidad).subscribe((resp) => {
                //console.log('comunidad con multimedia', resp);
                this.modalComunidadVisible = true;
                this.dataComunidad = resp.data;
            });
            //this.dataComunidad = comunidad;
        }
        this.tipoAccion = tipoAccion;
        this.modalTitle = modalTitle;
        this.titleButton = titleButton;
    }

    cerrarModal(value: boolean) {
        this.modalComunidadVisible = value;
    }

    datosGuardadosModal(value: boolean) {
        this.modalComunidadVisible = value;
        this.getComunidades();
    }
    // buscar por filtro
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    //para imprimir la lista de comundiades
    onImprimir() {
        let rowNumber=0;
        const encabezado = ["N°","Nombre", "Descripción", "Superficie m2", "Población"];
        this.comunidadesService.getComunidades().subscribe((comunidades) => {
            this.comunidades = comunidades;
            const cuerpo = Object(this.comunidades).map(
                (obj: any) => {
                    const datos = [
                        rowNumber += 1,
                        obj.nombre,
                        obj.descripcion,
                        obj.superficie,
                        obj.poblacion
                    ]
                    return datos;
                }
            )
            console.log(cuerpo);
            this.srvImprimir.imprimir(encabezado, cuerpo, "Lista comunidades", true);
        });
    }
}
