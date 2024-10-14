import { Component } from '@angular/core';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

import { Roles } from '../../interfaces/roles';
import { Usuarios } from '../../interfaces/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesService } from '../../services/roles.service';
import { formatDate } from '@angular/common';
import { ReportesService } from '../../services/reportes.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
    providers: [DatePipe,{provide:LOCALE_ID, useValue: 'es'}],
})
export class UsuariosComponent {
    usuarios: Usuarios[] = [];
    currentRowNumber:number = 0;

    modalUsuarioVisible: boolean = false;
    dataUsuario: Usuarios = {
        nombre: null,
        ap: null,
        am: null,
        ci: null,
        fecha_nac: null,
        usuario: null,
        contrasena: null,
        estado: null,
        id_rol: null,
    };
    tipoAccion: number = 1; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar
    modalTitle: String = 'Agregar Usuario';
    titleButton: String = 'Agregar';

    constructor(
        private usuariosService: UsuariosService,
        private rolesService: RolesService,
        private srvImprimir: ReportesService,
        private datePipe: DatePipe
    ) {}

    ngOnInit(): void {
        this.getUsuarios();
    }
    
    getUsuarios() {
        this.usuariosService.getUsuarios().subscribe((usuarios) => {
            this.usuarios = usuarios;
        });
    }

    modalUsuario(
        usuario: any,
        tipoAccion: number,
        modalTitle: string,
        titleButton: string
    ) {
        this.modalUsuarioVisible = true;
        if (usuario == null) {
            this.dataUsuario = {
                nombre: null,
                ap: null,
                am: null,
                ci: null,
                fecha_nac: null,
                usuario: null,
                contrasena: null,
                estado: null,
                id_rol: null,
            };
        } else {
            this.dataUsuario = usuario;
        }
        this.tipoAccion = tipoAccion;
        this.modalTitle = modalTitle;
        this.titleButton = titleButton;
    }

    cerrarModal(value: boolean) {
        this.modalUsuarioVisible = value;
    }
    
    datosGuardadosModal(value: boolean) {
        this.modalUsuarioVisible = value;
        this.getUsuarios();
    }
      // buscar por filtro
      onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    onImprimir(){
        let rowNumber=0;
        const encabezado=["N°","Nombre","A. paterno","A. materno","CI","Fecha de nacimiento","Nombre usuario"];
        this.usuariosService.getUsuarios().subscribe((resp) => {
            this.usuarios = resp;
            const cuerpo= Object(this.usuarios).map(
                
                (obj:any)=>{        
                    const datos=[
                        rowNumber += 1,
                        obj.nombre,
                        obj.ap,
                        obj.am,
                        obj.ci,
                        this.datePipe.transform(obj.fecha_nac, 'EEEE, dd MMMM yyyy'),
                        obj.usuario,
                        
                    ]
                    return datos;
                }
            )
            console.log(cuerpo);
            this.srvImprimir.imprimir(encabezado,cuerpo,"Lista de usuarios",true);
        });
    }
}
