import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Comunidades } from 'src/app/protected/interfaces/comunidades';
import { ComunidadesService } from 'src/app/protected/services/comunidades.service';

@Component({
  selector: 'app-modal-comunidad',
  templateUrl: './modal-comunidad.component.html',
  styleUrls: ['./modal-comunidad.component.scss']
})
export class ModalComunidadComponent {
  @Input() titleButton!: String;
  @Input() comunidad!: Comunidades;
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
      descripcion: ['', [Validators.required]],
      superficie: ['', [Validators.required]],
      poblacion: ['', [Validators.required]],
      
  });

  constructor(
      private fb: FormBuilder,
      private comunidadesService: ComunidadesService
  ) {}

  ngOnInit() { 
    this.cargarDatos();
  }

  cargarDatos() {
      if (this.tipoAccion == 0) this.miFormulario.disable();
      if (this.tipoAccion != 1) {
          this.miFormulario.controls['nombre'].setValue(this.comunidad.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.comunidad.descripcion);
          this.miFormulario.controls['superficie'].setValue(this.comunidad.superficie);
          this.miFormulario.controls['poblacion'].setValue(this.comunidad.poblacion);
          
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
          this.agregarComunidad();
      }
      if (this.tipoAccion == 2) {
          this.editarComunidad();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionComunidad();
      }
      this.miFormulario.reset();
  }

  agregarComunidad() {
      this.comunidad.nombre = this.miFormulario.value.nombre;
      this.comunidad.descripcion = this.miFormulario.value.descripcion;
      this.comunidad.superficie = this.miFormulario.value.superficie;
      this.comunidad.poblacion = this.miFormulario.value.poblacion;
      this.comunidad.longitud = 0;
      this.comunidad.latitud = 0;
      this.comunidad.estado = 1;
      this.comunidad.id_usuario =1; 
      console.log('usuario', this.comunidad);

      this.comunidadesService.agregarComunidad(this.comunidad).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarComunidad() {
      this.comunidad.nombre = this.miFormulario.value.nombre;
      this.comunidad.descripcion = this.miFormulario.value.descripcion;
      this.comunidad.superficie = this.miFormulario.value.superficie;
      this.comunidad.poblacion = this.miFormulario.value.poblacion;
      this.comunidad.longitud = 0;
      this.comunidad.latitud = 0;
      this.comunidad.estado = 1;
      this.comunidad.id_usuario =1;
      console.log('usuario', this.comunidad);

      this.comunidadesService
          .editarComunidad(this.comunidad, this.comunidad.id_comunidad)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionComunidad() {
      console.log('usuario', this.comunidad);
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.comunidadesService.eliminarComunidad(this.comunidad.id_comunidad)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.comunidadesService
              .habilitarComunidad(this.comunidad.id_comunidad)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
