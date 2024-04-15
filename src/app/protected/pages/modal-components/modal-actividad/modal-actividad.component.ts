import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Actividades } from 'src/app/protected/interfaces/actividades';
import { ActividadesService } from 'src/app/protected/services/actividades.service';

@Component({
  selector: 'app-modal-actividad',
  templateUrl: './modal-actividad.component.html',
  styleUrls: ['./modal-actividad.component.scss']
})
export class ModalActividadComponent {
  @Input() titleButton!: String;
  @Input() actividad!: Actividades;
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
      direccion: ['', [Validators.required]],
      fecha_inicio: ['', [Validators.required]],
      fecha_fin: ['', [Validators.required]],
  });

  constructor(
      private fb: FormBuilder,
      private actividadesService: ActividadesService
  ) {}

  ngOnInit() {
    console.log('modal usuario', this.actividad);
      this.cargarDatos();
  }
  cargarDatos() {
      if (this.tipoAccion == 0) this.miFormulario.disable();
      if (this.tipoAccion != 1) {
          this.miFormulario.controls['nombre'].setValue(this.actividad.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.actividad.descripcion);
          this.miFormulario.controls['direccion'].setValue(this.actividad.direccion);
          this.miFormulario.controls['fecha_inicio'].setValue(new Date(this.actividad.fecha_inicio + ''));
          this.miFormulario.controls['fecha_fin'].setValue(new Date(this.actividad.fecha_fin + ''));
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
          this.agregarActividad();
      }
      if (this.tipoAccion == 2) {
          this.editarActividad();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionActividad();
      }
      this.miFormulario.reset();
  }

  agregarActividad() {
      this.actividad.nombre = this.miFormulario.value.nombre;
      this.actividad.descripcion = this.miFormulario.value.descripcion;
      this.actividad.direccion = this.miFormulario.value.direccion;
      this.actividad.fecha_inicio = this.miFormulario.value.fecha_inicio;
      this.actividad.fecha_fin = this.miFormulario.value.fecha_fin;
     
      this.actividad.estado = 1;
      

      this.actividadesService.agregarActividad(this.actividad).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarActividad() {
      this.actividad.nombre = this.miFormulario.value.nombre;
      this.actividad.descripcion = this.miFormulario.value.descripcion;
      this.actividad.direccion = this.miFormulario.value.direccion;
      this.actividad.fecha_inicio = this.miFormulario.value.fecha_inicio;
      this.actividad.fecha_fin = this.miFormulario.value.fecha_fin;
     
      this.actividad.estado = 1;

      this.actividadesService
          .editarActividad(this.actividad, this.actividad.id_actividad)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionActividad() {
      
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.actividadesService.eliminarActividad(this.actividad.id_actividad)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.actividadesService
              .habilitarActividad(this.actividad.id_actividad)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
