import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { ButtonModule } from 'primeng/button';


import { Roles } from '../../interfaces/roles';
import { RolesService } from '../../services/roles.service';
import { ReportesService } from '../../services/reportes.service';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
    roles: Roles[] = [];
    currentRowNumber:number = 0;

    modalRolVisible: boolean = false;
    dataRol: Roles = {
        nombre: null,
        estado: null,
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Rol';
    titleButton: String = 'Agregar';
    

    constructor(
        private rolesService: RolesService,
        private srvImprimir: ReportesService,
    ) {}

    ngOnInit(): void {
        this.getRoles();
        
    }
    
    getRoles() {
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
        });
    }

    modalRol(
        rol: any,
        tipoAccion: number,
        modalTitle: string,
        titleButton: string
    ) {
        this.modalRolVisible = true;
        if (rol == null) {
            this.dataRol = {
                nombre: null,
                estado: null,
                
            };
        } else {
            this.dataRol = rol;
        }
        this.tipoAccion = tipoAccion;
        this.modalTitle = modalTitle;
        this.titleButton = titleButton;
    }

    cerrarModal(value: boolean) {
        this.modalRolVisible = value;
    }
    
    datosGuardadosModal(value: boolean) {
        this.modalRolVisible = value;
        this.getRoles();
    }
      // buscar por filtro
      onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    //para hacer reportes
    onImprimir(){
        const encabezado=["Nombre"];
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
            //const cuerpo = roles.map(rol => Object.values(rol));
            const cuerpo=roles.map(rol => Object.values([rol.nombre]));
            console.log(cuerpo);
            this.srvImprimir.imprimir(encabezado,cuerpo,"Lista Roles",true);
        });
    }
}
