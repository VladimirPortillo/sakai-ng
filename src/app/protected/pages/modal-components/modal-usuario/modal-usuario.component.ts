import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Roles } from 'src/app/protected/interfaces/roles';

import { Usuarios } from 'src/app/protected/interfaces/usuarios';
import { RolesService } from 'src/app/protected/services/roles.service';

@Component({
    selector: 'app-modal-usuario',
    templateUrl: './modal-usuario.component.html',
    styleUrls: ['./modal-usuario.component.scss'],
})
export class ModalUsuarioComponent {
    @Input() titleButton!: String;
    @Input() usuario!: Usuarios;
    @Input() tipoAccion!: number; //1=agregar, 0 = ver, 2=editar

    @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();

    roles: Roles[] = [];
    rol!: Roles;
    miFormulario: FormGroup = this.fb.group({
        nombre: ['', [Validators.required, Validators.minLength(3)/* , Validators.maxLength(10) */]],
        ap: ['', [Validators.required]],
        am: ['', [Validators.required]],
        ci: ['', [Validators.required]],
        fecha_nac: ['', [Validators.required]],
        usuario: ['', [Validators.required]],
        contrasena: ['', [Validators.required]],
        rol: ['', [Validators.required]],
    });

    constructor(private rolesService: RolesService, private fb: FormBuilder) {}

    ngOnInit() {
        // console.log(this.usuario);
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
        if(this.tipoAccion == 0 || this.tipoAccion == 2) {
            this.miFormulario.controls['nombre'].setValue(this.usuario.nombre);
            this.miFormulario.controls['ap'].setValue(this.usuario.ap);
            this.miFormulario.controls['am'].setValue(this.usuario.am);
            this.miFormulario.controls['ci'].setValue(this.usuario.ci);
            this.miFormulario.controls['fecha_nac'].setValue(this.usuario.fecha_nac);
            this.miFormulario.controls['usuario'].setValue(this.usuario.usuario);
            this.miFormulario.controls['contrasena'].setValue(this.usuario.contrasena);
            this.miFormulario.controls['rol'].setValue(this.buscarRol());
        }
    }

    buscarRol() {
        return this.roles.find(rol => rol.id_rol == this.usuario.id_rol);        
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
        if (this.miFormulario.invalid) {
            this.miFormulario.markAllAsTouched();
            return;
        }
        console.log(this.miFormulario.value);
        this.miFormulario.reset();
    }
}
