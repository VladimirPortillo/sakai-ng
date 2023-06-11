import { Component } from '@angular/core';
import { Roles } from '../../interfaces/roles';
import { RolesService } from '../../services/roles.service';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
    visible: boolean = false;

    roles: Roles[] = [];
    ver_rol!: Roles;
    constructor(private rolesService: RolesService) {}
    ngOnInit(): void {
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
            console.log(roles);
        });
    }

    verRol(id_rol: number) {
        // console.log(id_rol)
        console.log('ver rol0', this.ver_rol);
        this.visible = true;
        console.log('entra');
        this.rolesService.verRol(id_rol).subscribe((roles) => {
            console.log('ver rol1', roles);
            this.ver_rol = roles.data[0];
            console.log('ver rol2', this.ver_rol);
        });
    }

    cerrarVerRol() {
        this.visible = false;
        this.ver_rol != undefined;
    }
    //agregar rol
    visible_agregar: boolean = false;
    verAgregarRol() {
        this.visible_agregar = true;
    }
    rol: Roles = {
        nombre: '',
        estado: 1,
    };
    guardar() {
        console.log(this.rol);
        if (this.rol.nombre.trim().length === 0) {
            return;
        }
        this.rolesService.agregarRol(this.rol).subscribe((resp) => {
            console.log('Respuesat', resp);
        });
        this.visible_agregar = false;
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
        });
    }
    cerraragregarRol() {
        this.visible_agregar = false;
    }
    //Eliminar rol
    visible_eliminar: boolean = false;
    verEliminarRol(id_rol: number) {
        this.visible_eliminar = true;
        this.rolesService.verRol(id_rol).subscribe((roles) => {
            this.ver_rol = roles.data[0];
        });
    }
    eliminarRol(id_rol: any) {
        console.log(id_rol);
        this.rolesService.eliminarRol(id_rol).subscribe((roles) => {});
        this.visible_eliminar = false;
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
        });
    }
    cerrarElimiarRol() {
        this.visible_eliminar = false;
    }
    //Habilitar rol
    visible_habilitar: boolean = false;
    verHabilitarRol(id_rol: number) {
        this.visible_habilitar = true;
        this.rolesService.verRol(id_rol).subscribe((roles) => {
            this.ver_rol = roles.data[0];
        });
    }
    habilitarRol(id_rol: any) {
        console.log(id_rol);
        this.rolesService.habilitarRol(id_rol).subscribe();
        this.visible_habilitar = false;
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
        });
    }
    cerrarHabilitarRol() {
        this.visible_habilitar = false;
    }
    //Editar rol
    visible_editar: boolean = false;
    verEditarRol(id_rol: number) {
        this.visible_editar = true;
        this.rolesService.verRol(id_rol).subscribe((roles) => {
            this.ver_rol = roles.data[0];
        });
    }
    editarRol(id_rol: any) {
        if (this.rol.nombre.trim().length === 0) {
            return;
        }
        this.rolesService.editarRol(id_rol, this.rol).subscribe((resp) => {
            console.log('Respuesat', resp);
        });
        this.visible_editar = false;
        this.rolesService.getRoles().subscribe((roles) => {
            this.roles = roles;
        });
    }
    cerrarEditarRol() {
        this.visible_editar = false;
    }
}
