import { Component } from '@angular/core';
import { Roles } from '../../interfaces/roles';
import { Usuarios } from '../../interfaces/usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { RolesService } from '../../services/roles.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
    usuarios: Usuarios[] = [];

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
        private rolesService: RolesService
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
}
