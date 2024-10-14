import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoActividades } from 'src/app/protected/interfaces/tipoActividades';
import { tipoActividadesService } from 'src/app/protected/services/tipoActividades.service';


@Component({
  selector: 'app-modal-tipo-actividad',
  templateUrl: './modal-tipo-actividad.component.html',
  styleUrls: ['./modal-tipo-actividad.component.scss']
})
export class ModalTipoActividadComponent {
  @Input() titleButton!: String;
  @Input() tipoActividad!: TipoActividades;
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
  });

  constructor(
      private tipoActividadesService: tipoActividadesService,
      private fb: FormBuilder,
      
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
      if (this.tipoAccion == 0) this.miFormulario.disable();
      if (this.tipoAccion != 1) {
          this.miFormulario.controls['nombre'].setValue(this.tipoActividad.nombre);
          this.miFormulario.controls['descripcion'].setValue(this.tipoActividad.descripcion);
         
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
          this.agregarTipoActividad();
      }
      if (this.tipoAccion == 2) {
          this.editarTipoActividad();
      }
      if (this.tipoAccion == 3 || this.tipoAccion == 4) {
          this.accionTipoActividad();
      }
      this.miFormulario.reset();
  }

  agregarTipoActividad() {
      this.tipoActividad.nombre = this.miFormulario.value.nombre;
      this.tipoActividad.descripcion = this.miFormulario.value.descripcion;

      this.tipoActividadesService.agregarTipoActividad(this.tipoActividad).subscribe((resp) => {
          this.onSaveDataModal.emit(false);
      });
  }

  editarTipoActividad() {
      this.tipoActividad.nombre = this.miFormulario.value.nombre;
     
      this.tipoActividadesService
          .editarTipoActividad(this.tipoActividad, this.tipoActividad.id_tipo)
          .subscribe((resp) => {
              this.onSaveDataModal.emit(false);
          });
  }

  accionTipoActividad() {
      
      if(this.tipoAccion == 3) {
          // Eliminación de usuario
          this.tipoActividadesService.eliminarTipoActividad(this.tipoActividad.id_tipo)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }

      if (this.tipoAccion == 4) {
          // Habilitación de usuario
          this.tipoActividadesService
              .habilitarTipoActividad(this.tipoActividad.id_tipo)
              .subscribe((data) => {
                  this.onSaveDataModal.emit(false);
              });
      }
          
  }
}
