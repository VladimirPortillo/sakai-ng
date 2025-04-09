import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/protected/interfaces/roles';

import { Usuarios } from 'src/app/protected/interfaces/usuarios';
import { RolesService } from 'src/app/protected/services/roles.service';
import { UsuariosService } from 'src/app/protected/services/usuarios.service';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrimeNGConfig } from 'primeng/api';
registerLocaleData(localeEs, 'es');

@Component({
    selector: 'app-modal-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss'],
})
export class ModalUsuarioComponent {
    @Input() titleButton!: String;
    @Input() usuario!: Usuarios;
    @Input() tipoAccion!: number; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar

    @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();
    @Output() onSaveDataModal: EventEmitter<boolean> = new EventEmitter();

    minFechaNacimiento: Date;
    maxFechaNacimiento: Date;
    roles: Roles[] = [];
    rol!: Roles;
    miFormulario: FormGroup = this.fb.group({
        nombre: [
            '',
            [
                Validators.required,
                Validators.minLength(3) /* , Validators.maxLength(10) */,
            ],
        ],
        ap: ['', [Validators.required]],
        am: ['', [Validators.required]],
        ci: ['', [Validators.required]],
        fecha_nac: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        contrasena: ['', [Validators.required]],
        rol: ['', [Validators.required]],
    });

    constructor(
        private rolesService: RolesService,
        private fb: FormBuilder,
        private usuariosService: UsuariosService,
        private primengConfig: PrimeNGConfig,
    ) {
        const hoy = new Date();
    
        // Establece el rango de fechas válidas
        this.maxFechaNacimiento = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate()); // Máximo 18 años atrás
        this.minFechaNacimiento = new Date(hoy.getFullYear() - 100, hoy.getMonth(), hoy.getDate()); // Mínimo 100 años atrás
      }
    

    ngOnInit() {
        this.cambiarIdioma();
        this.getRoles();
    }

    getRoles() {
        this.rolesService.getRoles().subscribe((roles) => {
            // console.log(roles);
            this.roles = roles;
            this.cargarDatos();
        });
    }

    cargarDatos() {
        if (this.tipoAccion == 0) this.miFormulario.disable();
        if (this.tipoAccion != 1) {
            this.miFormulario.controls['nombre'].setValue(this.usuario.nombre);
            this.miFormulario.controls['ap'].setValue(this.usuario.ap);
            this.miFormulario.controls['am'].setValue(this.usuario.am);
            this.miFormulario.controls['ci'].setValue(this.usuario.ci);
            this.miFormulario.controls['fecha_nac'].setValue(
                new Date(this.usuario.fecha_nac + '')
            );
            this.miFormulario.controls['usuario'].setValue(
                this.usuario.usuario
            );
            this.miFormulario.controls['contrasena'].setValue(
                this.usuario.contrasena
            );
            this.miFormulario.controls['rol'].setValue(this.buscarRol());
        }
    }

    buscarRol() {
        return this.roles.find((rol) => rol.id_rol == this.usuario.id_rol);
    }

    campoEsValido(campo: string) {
        return (
            this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched
        );
    }

    campoErrorMsg(campo: string) {
        console.log('ERRORS', this.miFormulario.controls[campo]?.errors);
        if (this.miFormulario.controls[campo]?.errors?.['required']) {
            return `Este campo es requerido.`;
        }
        if (this.miFormulario.controls[campo]?.errors?.['minlength']) {
            const value =
                this.miFormulario.controls[campo]?.errors?.['minlength']
                    .requiredLength;
            return `Este campo debe tener mínimo ${value} caracteres.`;
        }
        if (this.miFormulario.controls[campo]?.errors?.['maxlength']) {
            const value =
                this.miFormulario.controls[campo]?.errors?.['maxlength']
                    .requiredLength;
            return `Este campo debe tener máximo ${value} caracteres.`;
        }
        return;
    }

    cerrarModal() {
        this.onCloseModal.emit(false);
    }

    guardar() {
        console.log('miFormulario', this.miFormulario.value);
        if (this.miFormulario.invalid) {
            this.miFormulario.markAllAsTouched();
            return;
        }
        if (this.tipoAccion == 1) {
            this.agregarUsuario();
        }
        if (this.tipoAccion == 2) {
            this.editarUsuario();
        }
        if (this.tipoAccion == 3 || this.tipoAccion == 4) {
            this.accionUsuario();
        }
        this.miFormulario.reset();
    }

    agregarUsuario() {
        this.usuario.nombre = this.miFormulario.value.nombre;
        this.usuario.ap = this.miFormulario.value.ap;
        this.usuario.am = this.miFormulario.value.am;
        this.usuario.ci = this.miFormulario.value.ci;
        this.usuario.fecha_nac = this.miFormulario.value.fecha_nac;
        this.usuario.usuario = this.miFormulario.value.usuario;
        this.usuario.contrasena = this.miFormulario.value.contrasena;
        this.usuario.estado = 1;
        this.usuario.id_rol = this.miFormulario.value.rol.id_rol;
        console.log('usuario', this.usuario);

        this.usuariosService.agregarUsuario(this.usuario).subscribe((resp) => {
            this.onSaveDataModal.emit(false);
        });
    }

    editarUsuario() {
        this.usuario.nombre = this.miFormulario.value.nombre;
        this.usuario.ap = this.miFormulario.value.ap;
        this.usuario.am = this.miFormulario.value.am;
        this.usuario.ci = this.miFormulario.value.ci;
        this.usuario.fecha_nac = this.miFormulario.value.fecha_nac;
        this.usuario.usuario = this.miFormulario.value.usuario;
        this.usuario.contrasena = this.miFormulario.value.contrasena;
        this.usuario.estado = 1;
        this.usuario.id_rol = this.miFormulario.value.rol.id_rol;
        console.log('usuario', this.usuario);

        this.usuariosService
            .editarUsuario(this.usuario, this.usuario.id_usuario)
            .subscribe((resp) => {
                this.onSaveDataModal.emit(false);
            });
    }

    accionUsuario() {
        console.log('usuario', this.usuario);
        if(this.tipoAccion == 3) {
            // Eliminación de usuario
            this.usuariosService.eliminarUsuario(this.usuario.id_usuario)
                .subscribe((data) => {
                    this.onSaveDataModal.emit(false);
                });
        }

        if (this.tipoAccion == 4) {
            // Habilitación de usuario
            this.usuariosService
                .habilitarUsuario(this.usuario.id_usuario)
                .subscribe((data) => {
                    this.onSaveDataModal.emit(false);
                });
        }
            
    }
      //cambiar idioma al colendario a español
  cambiarIdioma(){
    this.primengConfig.setTranslation({
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Limpiar',
      dateFormat: 'dd/mm/yy',
      weekHeader: 'Sem'
    });
  }
}
