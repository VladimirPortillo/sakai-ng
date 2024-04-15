import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Roles } from 'src/app/protected/interfaces/roles';
import { RolesService } from 'src/app/protected/services/roles.service';

@Component({
  selector: 'app-modal-rol',
  templateUrl: './modal-rol.component.html',
  styleUrls: ['./modal-rol.component.scss']
})
export class ModalRolComponent {
  @Input() titleButton!: String;
  @Input() rol!: Roles;
  @Input() tipoAccion!: number; //1=agregar, 0 = ver, 2=editar, 3 = eliminar, 4 = habilitar

  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter();
  @Output() onSaveDataModal: EventEmitter<boolean> = new EventEmitter();

 
  miFormulario: FormGroup = this.fb.group({
      nombre: [
          '',
          [
              Validators.required,
              Validators.minLength(3) /* , Validators.maxLength(10) */,
          ],
      ],
  });

  constructor(
      private rolesService: RolesService,
      private fb: FormBuilder,
      
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
      if (this.tipoAccion == 0) this.miFormulario.disable();
      if (this.tipoAccion != 1) {
          this.miFormulario.controls['nombre'].setValue(this.rol.nombre);
         
      }
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
          this.agregarRol();
      }
      if (this.tipoAccion == 2) {
          this.editarRol();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionRol();
      }
      this.miFormulario.reset();
  }

  agregarRol() {
      this.rol.nombre = this.miFormulario.value.nombre;

      this.rolesService.agregarRol(this.rol).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarRol() {
      this.rol.nombre = this.miFormulario.value.nombre;
     
      this.rolesService
          .editarRol(this.rol, this.rol.id_rol)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionRol() {
      
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.rolesService.eliminarRol(this.rol.id_rol)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.rolesService
              .habilitarRol(this.rol.id_rol)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
